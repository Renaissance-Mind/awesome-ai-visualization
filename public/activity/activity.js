(() => {
  const payload = JSON.parse(document.getElementById('activity-data').textContent);
  const {monthly:months,categories,copy:T,locale} = payload;
  const root = document.getElementById('activity-report');
  const legend = document.getElementById('category-legend');
  const tooltip = root.querySelector('.chart-tooltip');
  const number = new Intl.NumberFormat(locale);
  const hidden = new Set();
  const plots = [...root.querySelectorAll('.chart-section')].map(section => {
    const container = section.querySelector('.plot');
    const svg = d3.create('svg').attr('role','img').attr('aria-label',section.querySelector('h2').textContent);
    container.replaceChildren(svg.node());
    return {container,svg,key:section.dataset.measure};
  });
  let pinned = false, monthIndex = null, activeMeasure = null, layouts = [];
  const color = i => 'var(--series-' + (i%6+1) + ')';
  const active = () => categories.filter(c => !hidden.has(c.id));
  const total = (row,key) => active().reduce((s,c) => s+row[key][c.id],0);
  document.getElementById('language-picker').addEventListener('change',event => {
    window.location.assign('../'+event.target.value+'/'+window.location.hash);
  });
  categories.forEach((category,i) => {
    const button = document.createElement('button');
    button.type='button'; button.className='category-key'; button.dataset.category=category.id;
    button.setAttribute('aria-pressed','true');
    const swatch=document.createElement('span'); swatch.className='swatch'; swatch.setAttribute('aria-hidden','true');
    swatch.style.backgroundColor=color(i);
    if(i>=6) swatch.style.backgroundImage='repeating-linear-gradient(135deg,transparent 0 3px,#fff 3px 4px)';
    const label=document.createElement('span'); label.textContent=category.label;
    button.append(swatch,label);
    button.addEventListener('click',() => {
      hidden.has(category.id)?hidden.delete(category.id):hidden.add(category.id);
      button.setAttribute('aria-pressed',String(!hidden.has(category.id)));
      pinned=false; tooltip.hidden=true; draw(true);
    });
    legend.append(button);
  });
  function show(index,key,event) {
    monthIndex=index; activeMeasure=key;
    layouts.forEach(l => l.focus.attr('x',l.x(months[index].month)).attr('width',l.x.bandwidth()).attr('visibility','visible'));
    const row=months[index]; tooltip.replaceChildren();
    const heading=document.createElement('div'); heading.className='tooltip-title';
    heading.textContent=row.month+(row.partial_month?' · '+T.partial:''); tooltip.append(heading);
    active().forEach(c => {
      const line=document.createElement('div');line.className='tooltip-row';
      const label=document.createElement('span');label.textContent=c.label;
      const value=document.createElement('span');value.textContent=number.format(row[key][c.id]);
      line.append(label,value);tooltip.append(line);
    });
    const sum=document.createElement('div');sum.className='tooltip-row tooltip-total';
    const label=document.createElement('span');label.textContent=T.total;
    const value=document.createElement('span');value.textContent=number.format(total(row,key));
    sum.append(label,value);tooltip.append(sum);tooltip.hidden=false;
    const bounds=root.getBoundingClientRect(),tip=tooltip.getBoundingClientRect();
    tooltip.style.left=Math.max(0,Math.min(bounds.width-tip.width,event.clientX-bounds.left+12))+'px';
    tooltip.style.top=Math.max(0,Math.min(bounds.height-tip.height,event.clientY-bounds.top-tip.height-10))+'px';
  }
  function hide() {
    if(pinned)return;
    tooltip.hidden=true;monthIndex=null;layouts.forEach(l=>l.focus.attr('visibility','hidden'));
  }
  function draw(animate=false) {
    layouts=[];
    plots.forEach(({container,svg,key},panel) => {
      const width=container.getBoundingClientRect().width,height=width<440?290:350;
      const left=80,top=32,right=width-12,bottom=height-65;
      svg.attr('viewBox','0 0 '+width+' '+height).attr('height',height);
      svg.selectAll(':scope > :not(g.bars)').remove();
      let bars=svg.select('g.bars');if(bars.empty())bars=svg.append('g').attr('class','bars');
      const defs=svg.append('defs');
      categories.forEach((c,i)=>{
        if(i<6)return;
        const pattern=defs.append('pattern').attr('id','activity-pattern-'+panel+'-'+i)
          .attr('patternUnits','userSpaceOnUse').attr('width',6).attr('height',6);
        pattern.append('rect').attr('width',6).attr('height',6).attr('fill',color(i));
        pattern.append('path').attr('d','M-1,1 L1,-1 M0,6 L6,0 M5,7 L7,5').attr('stroke','#fff').attr('stroke-width',1.1);
      });
      const sums=months.map(row=>total(row,key)),extent=d3.extent(sums);
      root.querySelector('[data-total-for="'+key+'"]').textContent=T.total+': '+number.format(d3.sum(sums))+' · '+months[0].month+' — '+months.at(-1).month;
      const y=d3.scaleLinear().domain([Math.min(0,extent[0]),Math.max(1,extent[1]*1.12)]).nice().range([bottom,top]);
      const x=d3.scaleBand().domain(months.map(row=>row.month)).range([left+2,right-2]).paddingInner(.12).paddingOuter(.03);
      const grid=svg.append('g').attr('transform','translate('+left+',0)')
        .call(d3.axisLeft(y).tickValues(y.ticks(4).filter(Number.isInteger)).tickSize(-(right-left)).tickPadding(8).tickFormat(number.format));
      grid.selectAll('.tick line').attr('opacity',.5);grid.lower();
      const indices=d3.range(0,months.length,width<440?12:6);
      if(indices.at(-1)!==months.length-1)indices.push(months.length-1);
      const axis=svg.append('g').attr('transform','translate(0,'+bottom+')')
        .call(d3.axisBottom(x).tickValues(indices.map(i=>months[i].month)).tickSize(0).tickPadding(12));
      axis.selectAll('.tick text').attr('text-anchor',(_,i)=>i===0?'start':i===indices.length-1?'end':'middle');
      svg.append('rect').attr('x',left).attr('y',top).attr('width',right-left).attr('height',bottom-top)
        .attr('fill','none').attr('stroke','var(--line)').attr('stroke-width',1);
      svg.append('text').attr('x',left).attr('y',16).text(key==='commits'?T.commitsUnit:T.createdUnit);
      svg.append('text').attr('x',(left+right)/2).attr('y',height-10).attr('text-anchor','middle').text(T.month);
      const stack=d3.stack().keys(active().map(c=>c.id)).value((row,c)=>row[key][c])(months);
      const marks=stack.flatMap(series=>series.map((p,i)=>({category:series.key,month:months[i].month,partial:months[i].partial_month,low:p[0],high:p[1]})));
      const selection=bars.selectAll('rect').data(marks,d=>d.category+':'+d.month);selection.exit().remove();
      const merged=selection.enter().append('rect').attr('y',bottom).attr('height',0).merge(selection)
        .attr('x',d=>x(d.month)).attr('width',x.bandwidth()).attr('opacity',d=>d.partial ? .45 : 1)
        .attr('fill',d=>{const i=categories.findIndex(c=>c.id===d.category);return i<6?color(i):'url(#activity-pattern-'+panel+'-'+i+')';});
      const target=animate&&!matchMedia('(prefers-reduced-motion: reduce)').matches?merged.transition().duration(220):merged;
      target.attr('y',d=>y(d.high)).attr('height',d=>Math.max(0,y(d.low)-y(d.high)));
      if(active().length){
        const i=d3.maxIndex(sums),px=x(months[i].month)+x.bandwidth()/2;
        const label=svg.append('text').attr('x',px).attr('y',y(sums[i])-9).attr('text-anchor',px>right-150?'end':'start').text(months[i].month+' · '+number.format(sums[i]));
        const box=label.node().getBBox();if(box.x<left+4||box.x+box.width>right-4)label.remove();
      }
      const focus=svg.append('rect').attr('y',top).attr('height',bottom-top).attr('fill','var(--ink)').attr('opacity',.06).attr('visibility','hidden');
      layouts.push({x,focus});
      svg.append('rect').attr('data-chart-hit','').attr('x',left).attr('y',top).attr('width',right-left).attr('height',bottom-top).attr('fill','transparent')
        .on('pointermove',event=>{
          if(pinned)return;const [px]=d3.pointer(event,svg.node());
          const i=Math.max(0,Math.min(months.length-1,Math.floor((px-x.range()[0])/x.step())));show(i,key,event);
        }).on('pointerleave',hide).on('click',event=>{
          const [px]=d3.pointer(event,svg.node()),i=Math.max(0,Math.min(months.length-1,Math.floor((px-x.range()[0])/x.step())));
          pinned=!(pinned&&monthIndex===i&&activeMeasure===key);if(pinned)show(i,key,event);else hide();
        });
      let previous=-Infinity;axis.selectAll('.tick').each(function(){const b=this.getBoundingClientRect();if(b.left<previous+4)d3.select(this).remove();else previous=b.right;});
    });
  }
  new ResizeObserver(()=>draw()).observe(root);
  draw();
  if(['#commits','#repos-created'].includes(window.location.hash))document.querySelector(window.location.hash).scrollIntoView();
})();

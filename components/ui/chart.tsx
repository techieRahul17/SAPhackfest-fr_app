"use client"

export const AreaChart = ({
  data,
  categories,
  index,
  colors,
  valueFormatter,
  className,
}: {
  data: any[]
  categories: string[]
  index: string
  colors: string[]
  valueFormatter: (value: number) => string
  className?: string
}) => {
  return (
    <div className={className}>
      <div className="h-full w-full flex items-center justify-center">
        <div className="w-full h-full p-4 bg-muted/20 rounded-md overflow-hidden relative">
          {/* Simulated area chart */}
          <div className="absolute bottom-0 left-0 right-0 h-3/4 bg-gradient-to-t from-blue-100/60 to-blue-500/10 dark:from-blue-900/30 dark:to-blue-500/5"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1/2 border-t border-blue-500/20 rounded-xl"></div>

          {/* X-axis labels */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4 pb-2 text-xs text-muted-foreground">
            {data
              .filter((_, i) => i % 4 === 0)
              .map((item, i) => (
                <div key={i}>{item.date}</div>
              ))}
          </div>

          {/* Y-axis labels */}
          <div className="absolute top-0 bottom-10 left-0 flex flex-col justify-between py-4 text-xs text-muted-foreground">
            <div>30</div>
            <div>20</div>
            <div>10</div>
            <div>0</div>
          </div>

          {/* Simulated area chart */}
          <div className="absolute bottom-12 left-8 right-4 h-3/5 flex items-end">
            {data.map((item, i) => (
              <div key={i} className="flex-1 flex items-end justify-center group">
                <div
                  className="w-1 rounded-t-full bg-blue-500 hover:bg-blue-600 transition-all cursor-pointer group-hover:w-2"
                  style={{ height: `${item.value * 3}px` }}
                >
                  <div className="opacity-0 group-hover:opacity-100 absolute bottom-full mb-2 -ml-10 bg-blue-500 text-white text-xs p-1 rounded whitespace-nowrap transition-opacity">
                    {valueFormatter(item.value)} ({item.date})
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export const BarChart = ({
  data,
  categories,
  index,
  colors,
  valueFormatter,
  className,
}: {
  data: any[]
  categories: string[]
  index: string
  colors: string[]
  valueFormatter: (value: number) => string
  className?: string
}) => {
  const maxValue = Math.max(...data.map((item) => item.value))

  return (
    <div className={className}>
      <div className="h-full w-full flex items-center justify-center">
        <div className="w-full h-full p-4 bg-muted/20 rounded-md overflow-hidden relative">
          {/* Y-axis labels */}
          <div className="absolute top-4 bottom-16 left-0 flex flex-col justify-between text-xs text-muted-foreground">
            <div>{maxValue}</div>
            <div>{Math.round(maxValue * 0.75)}</div>
            <div>{Math.round(maxValue * 0.5)}</div>
            <div>{Math.round(maxValue * 0.25)}</div>
            <div>0</div>
          </div>

          {/* X-axis grid lines */}
          <div className="absolute top-4 bottom-16 left-8 right-4 flex flex-col justify-between pointer-events-none">
            <div className="border-b border-dashed border-muted-foreground/20 w-full"></div>
            <div className="border-b border-dashed border-muted-foreground/20 w-full"></div>
            <div className="border-b border-dashed border-muted-foreground/20 w-full"></div>
            <div className="border-b border-dashed border-muted-foreground/20 w-full"></div>
            <div className="border-b border-muted-foreground/20 w-full"></div>
          </div>

          {/* Bars */}
          <div className="absolute bottom-16 left-8 right-4 top-4 flex items-end justify-around">
            {data.map((item, i) => (
              <div key={i} className="flex-1 flex flex-col items-center justify-end mx-1 group">
                <div
                  className="w-full max-w-[30px] bg-blue-500 hover:bg-blue-600 transition-all cursor-pointer rounded-t-sm group-hover:brightness-110"
                  style={{ height: `${(item.value / maxValue) * 100}%` }}
                >
                  <div className="opacity-0 group-hover:opacity-100 absolute bottom-full mb-2 bg-blue-500 text-white text-xs p-1 rounded whitespace-nowrap transition-opacity">
                    {valueFormatter(item.value)}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground mt-2 w-full text-center truncate">
                  {item.status || item[index]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


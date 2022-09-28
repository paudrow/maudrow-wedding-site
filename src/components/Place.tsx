const Place = ({ children, url, title, svgPath }: { children: JSX.Element | JSX.Element[], url: string, title: string, svgPath: string }) => (
  <div className="text-center py-10 px-8 md:px-2 lg:px-10 flex flex-col place-content-center justify-between md:max-w-xl h-full">
    <div className="py-4">
      <div className="flex justify-center">
        <object data={svgPath}></object>
      </div>
      <h2 className="text-xl font-bold uppercase py-3">{title}</h2>
      <div className="py-5">
        {children}
      </div>
      </div>
    <button
      className="uppercase self-center my-6 px-4 py-2 m-4 w-1/2 md:w-2/3 lg:w-48 bg-white border-fire-opal border-2 rounded-xl text-fire-opal"
    >
      <a href={url}>
        See on map
      </a>
    </button>

  </div>
)

export default Place
const Place = ({ children, url, title, svgPath }: { children: JSX.Element | JSX.Element[], url: string, title: string, svgPath: string }) => (
  <div className="text-center my-10 mx-4 md:mx-2 lg:mx-10 flex flex-col justify-between">
    <div>
      <div className="flex justify-center">
        <object data={svgPath}></object>
      </div>
      <h2 className="text-xl font-bold">{title}</h2>
      <div>
        {children}
      </div>
    </div>
    <button
      className="mt-6 px-4 py-2 bg-white border-red-600 border-2 rounded-xl text-red-600"
    >
      <a href={url}>
        See on map
      </a>
    </button>
  </div>
)

export default Place
/* eslint-disable jsx-a11y/anchor-has-content */

const NavigationDots = ({active}) => {
  return (
    <div className="app__navigation">
      {["home", "about", "project", "skills", "contact me"].map((item, index) => (
        <a
          href={`#${item}`}
          key={item + index}
          className="app__navigation-dot"
          style={active === item ? {backgroundColor: "#313b1c"} : {}}
        />
       ))}
    </div>
  )
}

export default NavigationDots

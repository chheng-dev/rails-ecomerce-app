import React from "react";


export default class DeletionContentComp extends React.Component {
  render() {
    const { title, link, length } = this.props;
    return (
      <Fragment>
        <div className="flex justify-between items-center px-4 py-2">
          <div>
            <h2 className="font-semibold text-lg py-3">{list_title}</h2>
          </div>
          <div className="flex items-center space-x-2">
            <h4>Products has been selection ${length}</h4>
            <ButtonComp
              title={title}
              link={link}
              type="submit"
            />
          </div>
        </div>
        <hr className="mb-3" />
      </Fragment>
    )
  }
}
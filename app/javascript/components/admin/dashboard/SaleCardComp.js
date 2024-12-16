import React from 'react'
import { FaArrowTrendUp } from "react-icons/fa6";

class SaleCardComp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return (
      <div className='flex justify-between gap-3'>
        {Array(4).fill(null).map((_, index) => (
          <div
            key={index}
            className="w-1/4 p-3 rounded-xl shadow-sm bg-white h-[100px]"
          >
            <div className='flex flex-col'>
              <div className='flex gap-x-2 items-center'>
                <p className='text-sm text-gray-600'>
                  Product viewed
                </p>
                <div className='flex gap-x-1'>
                  <p className='text-xs text-green-500'>2.9%</p>
                  <FaArrowTrendUp className='w-3 h-3' />
                </div>

              </div>
              <h3 className='text-xl font-medium my-1 text-primary'>911.34K</h3>
              <div className='flex justify-between gap-x-3 mt-2'>
                <div className=''>
                  <p className='text-xs text-gray-500'>vs. last month</p>
                </div>
                <div>
                  <p className='text-xs'>211.09k</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

export default SaleCardComp

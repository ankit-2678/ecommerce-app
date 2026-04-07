import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

function About() {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis qui odit sunt a consequatur, vero laborum maiores ducimus, autem magnam ullam minima veniam enim! Quis ea ipsam architecto repudiandae natus.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur adipisci voluptate a illum, veritatis nesciunt ut aliquid fugiat. Assumenda, ullam? Sit voluptates dignissimos voluptatibus voluptatum mollitia dolores recusandae molestiae labore!</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione obcaecati a dicta eveniet iusto, modi earum aliquam sunt, impedit tempore nulla. Porro eum assumenda repellat facilis esse. Voluptates, debitis fugit!</p>
        </div>

      </div>
      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance</b>
          <p className='text-gray-600'>Quality Assurance ensures that the application meets the required standards of functionality, performance, and reliability before deployment. In this project, QA involves testing all core features such as product browsing, filtering, cart operations, and authentication flows to verify they work as expected. Both manual testing and basic validation checks are performed to identify bugs, improve user experience, and ensure consistent behavior across different devices and screen sizes. This process helps deliver a stable and user-friendly e-commerce platform.</p>

        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>Our platform is designed to provide a seamless and convenient shopping experience for users. With an intuitive interface, easy navigation, and efficient search and filtering options, customers can quickly find products that match their needs. Features like a streamlined checkout process, saved preferences, and responsive design ensure that users can shop anytime, anywhere, with minimal effort.</p>

        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>We are committed to delivering exceptional customer service by prioritizing user satisfaction at every step. Our platform ensures clear communication, reliable support, and a smooth shopping journey from product selection to order placement. By focusing on user-friendly design, quick issue resolution, and continuous improvements, we strive to build trust and provide a positive experience for every customer.</p>

        </div>

      </div>

      <NewsLetterBox/>
    </div>
  )
}

export default About

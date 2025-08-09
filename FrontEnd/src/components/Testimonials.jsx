import React from 'react';
import { RiDoubleQuotesL, RiDoubleQuotesR } from 'react-icons/ri';

const testimonials = [
  {
    id: 1,
    name: "Ayesha Khan",
    location: "Lahore",
    rating: 5,
    comment: "My daughter loves the educational toys! Fast delivery and excellent quality.",
    image: "/images/testimonial1.jpeg"
  },
  {
    id: 2,
    name: "Ali Ahmed",
    location: "Karachi",
    rating: 4,
    comment: "Great collection of action figures. My son hasn't put them down since they arrived!",
    image: "/images/testimonial2.jpeg"
  },
  {
    id: 3,
    name: "Fatima Malik",
    location: "Islamabad",
    rating: 5,
    comment: "The wooden puzzles are fantastic - durable and perfect for my toddler's development.",
    image: "/images/testimonial3.jpeg"
  }
];

const RatingStars = ({ rating }) => {
  return (
    <div className="flex text-teal-700">
      {[...Array(5)].map((_, i) => (
        <i
          key={i}
          className={`ri-star-${i < rating ? 'fill' : 'line'} text-xl`}
        />
      ))}
    </div>
  );
};

const Testimonials = () => {
  return (
    <section className="w-full bg-teal-50 py-16">
      <div className="w-[90%] lg:w-[85%] mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 text-center">
          What Parents <span className="text-teal-700">Say</span>
        </h2>
        <p className="text-gray-600 mb-12 text-center max-w-2xl mx-auto">
          Trusted by thousands of families across Pakistan
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.location}</p>
                </div>
              </div>
              <RatingStars rating={testimonial.rating} />
              <div className="mt-4 relative">
                <RiDoubleQuotesL className="text-teal-200 text-2xl absolute -top-2 -left-1" />
                <p className="text-gray-600 italic pl-6">{testimonial.comment}</p>
                <RiDoubleQuotesR className="text-teal-200 text-2xl float-right" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

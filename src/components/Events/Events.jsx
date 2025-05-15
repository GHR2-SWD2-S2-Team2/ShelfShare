import React from 'react';
import './Events.css';

const Events = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: "Book Club Meeting: Monthly Reads",
      date: "May 25, 2024",
      time: "6:00 PM",
      location: "Virtual Meeting",
      description: "Join us for our monthly book club discussion where we'll be exploring this month's selected reading.",
      category: "Book Club"
    },
    {
      id: 2,
      title: "Author Spotlight: Creative Writing Workshop",
      date: "June 2, 2024",
      time: "3:00 PM",
      location: "Main Library Hall",
      description: "An interactive workshop focusing on creative writing techniques and storytelling.",
      category: "Workshop"
    },
    {
      id: 3,
      title: "Children's Story Hour",
      date: "June 8, 2024",
      time: "10:00 AM",
      location: "Kids' Corner",
      description: "A magical hour of storytelling and activities for young readers aged 5-10.",
      category: "Children"
    },
    {
      id: 4,
      title: "Poetry Reading Night",
      date: "June 15, 2024",
      time: "7:00 PM",
      location: "Café Area",
      description: "An evening of poetry reading and sharing, featuring both classic and contemporary works.",
      category: "Poetry"
    }
  ];

  return (
    <div className="events-container">
      <div className="events-hero">
        <div className="events-hero-content">
          <h1>Upcoming Events</h1>
          <p className="hero-text">
            Join our community events and connect with fellow book lovers.
            From book clubs to author meetups, there's something for everyone.
          </p>
        </div>
      </div>

      <div className="events-content">
        <div className="events-filter">
          <button className="filter-btn active">All Events</button>
          <button className="filter-btn">Book Club</button>
          <button className="filter-btn">Workshop</button>
          <button className="filter-btn">Children</button>
          <button className="filter-btn">Poetry</button>
        </div>

        <div className="events-grid">
          {upcomingEvents.map(event => (
            <div key={event.id} className="event-card">
              <div className="event-category">{event.category}</div>
              <h3>{event.title}</h3>
              <div className="event-details">
                <div className="event-info">
                  <i className="bi bi-calendar3"></i>
                  <span>{event.date}</span>
                </div>
                <div className="event-info">
                  <i className="bi bi-clock"></i>
                  <span>{event.time}</span>
                </div>
                <div className="event-info">
                  <i className="bi bi-geo-alt"></i>
                  <span>{event.location}</span>
                </div>
              </div>
              <p className="event-description">{event.description}</p>
              <button className="register-btn">Register Now</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events; 
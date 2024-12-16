const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <header className="bg-blue-600 text-white py-8">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">About Us</h1>
          <p className="mt-2 text-lg">
            Discover who we are and what drives us.
          </p>
        </div>
      </header>

      {/* Introduction Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            Welcome to PrimePlace
          </h2>
          <p className="text-center text-gray-600 text-lg">
            PrimePlace is a dynamic platform designed to bring users the most
            seamless experience for discovering, managing, and interacting with
            listings. From tailored user profiles to advanced search
            capabilities, our mission is to simplify and enhance your journey.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            {/* Mission Image */}
            <div className="md:w-1/2 mb-6 md:mb-0">
              <img
                src="https://imgs.search.brave.com/-jMTnZZd7xwOg-7q4pRUYysmKng1kCiAL5QiQtcORlA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTI3/NTA5MDQxMi9waG90/by9iZWF1dGlmdWwt/Y291bnRyeS1ob3Vz/ZS1hbmQtZ2FyZGVu/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz0yYTVURWpadDJE/aS01Unh2Z0dLZnk0/MktYNXE4SFByUUZi/UEJhdWlrcW0wPQ"
                alt="Mission"
                className="rounded-lg shadow-lg"
              />
            </div>
            {/* Mission Content */}
            <div className="md:w-1/2 md:pl-10">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600 text-lg">
                At PrimePlace, we strive to revolutionize the way users connect
                with information and services. Our mission is to empower
                individuals and businesses by providing innovative solutions and
                a user-friendly platform to meet their needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features/Values Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-semibold text-gray-800 mb-6">
            What We Value
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <div className="text-blue-600 mb-4">
                <i className="fas fa-heart text-4xl"></i>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                User-Centric Design
              </h4>
              <p className="text-gray-600">
                We prioritize users in every decision we make to deliver
                exceptional experiences.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <div className="text-blue-600 mb-4">
                <i className="fas fa-bolt text-4xl"></i>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                Innovation
              </h4>
              <p className="text-gray-600">
                Continuous improvement and cutting-edge technology are at the
                heart of our journey.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <div className="text-blue-600 mb-4">
                <i className="fas fa-handshake text-4xl"></i>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                Collaboration
              </h4>
              <p className="text-gray-600">
                Building lasting relationships with our users, partners, and
                communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-blue-600 text-white py-8">
        <div className="container mx-auto text-center">
          <p className="text-lg">
            © {new Date().getFullYear()} PrimePlace. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default About;

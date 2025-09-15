import PropTypes from "prop-types";

const SimpleBanner = ({ title, backgroundImage }) => {
  // If either title or backgroundImage is missing, render nothing.
  if (!title || !backgroundImage) {
    return null;
  }

  return (
    <div
      className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden"
      role="banner"
    >
      {/* 1. Animated Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center animate-ken-burns"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        ></div>
      </div>

      {/* 2. Enhanced Overlay for Depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>

      {/* 3. Animated Decorative Elements */}
      <div
        className="absolute top-10 left-10 w-24 h-24 bg-white/10 rounded-full animate-float-slow"
        aria-hidden="true"
      ></div>
      <div
        className="absolute bottom-20 right-20 w-32 h-32 bg-white/5 rounded-2xl animate-float-medium"
        aria-hidden="true"
      ></div>
      <div
        className="absolute top-1/3 right-1/4 w-16 h-16 bg-teal-300/20 rounded-full animate-float-fast"
        aria-hidden="true"
      ></div>

      {/* Main content - with text shadow for readability */}
      <div className="relative text-center z-10 px-6">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white text-balance leading-tight tracking-tight [text-shadow:_0_4px_8px_rgb(0_0_0_/_40%)]">
          {title}
        </h1>
        <p className="mt-4 text-lg md:text-xl text-white/80 max-w-2xl mx-auto [text-shadow:_0_2px_4px_rgb(0_0_0_/_50%)]">
          A short, engaging subtitle can add context and style.
        </p>
        {/* Subtle accent line */}
        <div
          className="w-24 h-1.5 bg-white/60 mx-auto mt-8 rounded-full"
          aria-hidden="true"
        ></div>
      </div>
    </div>
  );
};

// Prop types remain the same
SimpleBanner.propTypes = {
  title: PropTypes.string.isRequired,
  backgroundImage: PropTypes.string.isRequired,
};

export default SimpleBanner;

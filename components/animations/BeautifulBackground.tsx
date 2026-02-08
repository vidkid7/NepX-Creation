"use client";

export default function BeautifulBackground() {
  return (
    <>
      {/* Animated gradient mesh */}
      <div className="gradient-mesh-bg" />
      
      {/* Grid pattern overlay */}
      <div className="grid-pattern" />
      
      {/* Light rays */}
      <div className="light-rays">
        <div className="light-ray ray-1" />
        <div className="light-ray ray-2" />
        <div className="light-ray ray-3" />
        <div className="light-ray ray-4" />
        <div className="light-ray ray-5" />
      </div>
      
      {/* Floating geometric shapes */}
      <div className="floating-shapes">
        <div className="shape shape-1" />
        <div className="shape shape-2" />
        <div className="shape shape-3" />
        <div className="shape shape-4" />
        <div className="shape shape-5" />
      </div>
      
      {/* Glowing orbs */}
      <div className="glow-orb orb-1" />
      <div className="glow-orb orb-2" />
      <div className="glow-orb orb-3" />
      <div className="glow-orb orb-4" />
      
      {/* Floating particles */}
      <div className="particles">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="particle" />
        ))}
      </div>
      
      {/* Subtle scanlines */}
      <div className="scanlines" />
    </>
  );
}

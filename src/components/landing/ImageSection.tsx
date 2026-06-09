export default function ImageSection() {
  return (
    <section className="h-[600px] w-full relative overflow-hidden">
      <div className="absolute inset-0 bg-petrol/90" />
      <div className="absolute inset-0 blueprint-grid opacity-30" />
      
      <div className="relative z-10 h-full flex items-center justify-center px-gutter">
        <div className="text-center max-w-4xl">
          <h2 className="font-sora text-3xl md:text-4xl uppercase mb-8 text-white bg-petrol/80 py-6 px-10 inline-block border-l-[8px] border-gold">
            Une approche batie sur l'excellence structurelle.
          </h2>
          <div className="bg-white p-8 mt-4 border-l-[8px] border-petrol inline-block">
            <p className="font-manrope text-lg italic font-light text-petrol">
              "La technologie ne doit pas etre une fin, mais la charpente de votre ambition."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
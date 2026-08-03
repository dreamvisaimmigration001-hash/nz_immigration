import Link from "next/link";
import Image from "next/image";

export default function Banner() {
  return (
    <>
<section className="hero hero--homepage bg--wave">
        
        <div className="hero__content">
            <div className="container">
                <div className="hero__text-wrapper">
                    
                    
                        <p className="hero__eyebrow">Immigration New Zealand</p>
                    

                    
                    <h1 className="hero__title" tabIndex={-1}>
                        <span className="hero__title-main">Apply now to visit, study, work or live in New Zealand</span>

                        
                    </h1>

                    
                </div>
            </div>

            
            
                <span className="hero__pattern"></span>
            
        </div>

    </section>
    </>
  );
}

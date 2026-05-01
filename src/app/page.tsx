import Hero            from '@/components/sections/Hero'
import Stats           from '@/components/sections/Stats'
import About           from '@/components/sections/About'
import Services        from '@/components/sections/Services'
import FeaturedProducts from '@/components/sections/FeaturedProducts'
import Testimonials    from '@/components/sections/Testimonials'
import Contact         from '@/components/sections/Contact'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <About />
      <Services />
      <FeaturedProducts />
      <Testimonials />
      <Contact />
    </>
  )
}

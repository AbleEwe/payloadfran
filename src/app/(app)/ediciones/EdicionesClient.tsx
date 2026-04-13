'use client'

import { PackagesSection } from '@/components/PackagesSection'
import type { EdicionesPageData } from '@/lib/ediciones'

type EdicionesClientProps = {
  data: EdicionesPageData
}

export default function EdicionesClient({ data }: EdicionesClientProps) {
  const { hero, needSection, packagesSection } = data

  return (
    <div className="mx-auto flex flex-col justify-center items-center text-center">
      <div
        className="flex flex-col items-center justify-center relative w-screen h-[60vh] md:h-screen bg-cover bg-fixed bg-center"
        style={{
          backgroundImage: `url('/Images/FotosEdiciones/pag.jpg')`
        }}
      />
      <h1 className="text-6xl mb-8 mt-[20vh] md:mt-[5vh]">{hero.title}</h1>

      <section className="flex flex-col w-full items-center bg-rosita text-center p-8">
        <h2 className="text-4xl pt-4 font-bold">{needSection.title}</h2>
        {needSection.subtitle && (
          <h3 className="text-xl pt-2">{needSection.subtitle}</h3>
        )}
        {needSection.bullets.length > 0 && (
          <ul className="mx-auto my-5 text-base list-disc text-left">
            {needSection.bullets.map((text, i) => (
              <li key={i} className="my-1 mb-2">
                {text}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="flex flex-col w-full items-center text-center p-8 md:p-16">
        <PackagesSection
          sectionTitle={packagesSection.title}
          sectionSubtitle={packagesSection.subtitle}
          backgroundImageUrl={packagesSection.backgroundImageUrl}
          pricingHeading={packagesSection.pricingHeading}
          ctaText={packagesSection.ctaText}
          ctaLink={packagesSection.ctaLink}
          packages={packagesSection.packages}
          pricingTable={data.pricingTable}
        />
      </section>
    </div>
  )
}

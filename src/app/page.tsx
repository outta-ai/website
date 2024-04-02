import type { StyledText } from "@/components/RichText";
import type { WebsiteMain } from "../../payload-types";

import { AboutSection } from "./(sections)/AboutSection";
import { CoreValueSeciton } from "./(sections)/CoreValueSection";
import { HistorySecion } from "./(sections)/HistorySection";
import { HowSection } from "./(sections)/HowSection";
import { LeadersSection } from "./(sections)/LeadersSection";
import { MainSection } from "./(sections)/MainSection";
import { SummarySection } from "./(sections)/SummarySection";

export default async function HomePage() {
  const request = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_CMS_URL}/api/globals/website-main`,
    {
      cache: "force-cache",
      next: {
        revalidate: 10 * 60,
      },
    }
  );

  const dataRaw = await request.json();
  const data = dataRaw as WebsiteMain;

  console.log(data);

  return (
    <>
      <MainSection />
      <AboutSection
        summary={data.about.summary as StyledText}
        description={data.about.description as StyledText}
      />
      <CoreValueSeciton values={data.values} />
      <div className="px-3 py-12 lg:mx-48">
        <h2 className="font-sbaggro font-light uppercase text-sm text-right">
          &lt;/About us&gt;
        </h2>
      </div>
      <HowSection
        title={data.methods.summary}
        description={data.methods.description as StyledText}
      />
      <SummarySection content={data.sumamry.contents as StyledText} />
      <HistorySecion contents={data.history} />
      <LeadersSection
        boardMembers={data.board_members}
        executiveMembers={data.executive_members}
      />
    </>
  );
}

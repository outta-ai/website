export function AboutSection() {
  return (
    <section className="w-full h-screen relative overflow-auto">
      <div className="h-full py-16 sm:py-32 mx-3 lg:mx-48 flex flex-col">
        <h2 className="font-sbaggro font-light uppercase text-sm">
          &lt;About us&gt;
        </h2>
        <p className="font-pretendard text-3xl mt-8">
          인공지능 교육 단체
          <br />
          <span className="font-bold">OUTTA</span>는
        </p>
        <div className="flex-1" />
        <p className="font-pretendard text-lg w-full max-w-[574px] break-keep">
          <span className="font-bold">&apos;out of&apos;</span>라는 뜻으로,
          <br />
          틀을 벗어난 새로운 경험을 중시하는 우리의 신념을 담고 있는 이름입니다.
          <br />
          <br />
          개개인의 역량을 일률적인 척도에 따라 평가하고, 다원적인 학습의 기회를
          제공하지 못하는 현대 사회의 교육 환경에 변화를 불러일으키고자
          설립되었습니다.
        </p>
      </div>
    </section>
  );
}

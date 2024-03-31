const Values = [
  {
    title: "Ideation",
    description:
      "스스로 관심있는 문제를 찾아내고 이를 해결할 아이디어를 제시합니다",
  },
  {
    title: "Recruiting",
    description: "아이디어를 실현하기 위해 필요한 인재들을 찾아 협력합니다",
  },
  {
    title: "Impact",
    description:
      "아이디어가 제안할 가치를 보다 많은 사람들과 공유함으로써 세상에 변화를 일으킵니다",
  },
];

export function CoreValueSeciton() {
  return (
    <section className="w-full lg:h-[75vh] bg-black">
      <div className="h-full py-16 sm:py-32 mx-3 lg:mx-48">
        <h2 className="text-white text-3xl font-sbaggro">Core Value</h2>
        <div className="w-full h-full flex flex-col lg:flex-row justify-between mt-12 gap-6">
          {Values.map((value, index) => (
            <div
              className="flex flex-row lg:flex-col items-center"
              key={`core-value-${value.title}-${index}`}
            >
              <div className="w-32 h-32 lg:w-48 lg:h-48 rounded-full bg-white flex justify-center items-center shrink-0">
                <p className="font-sbaggro text-sm lg:text-xl uppercase">
                  {value.title}
                </p>
              </div>
              <div className="w-12" />
              <p className="text-white text-base 2xl:text-xl break-keep">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

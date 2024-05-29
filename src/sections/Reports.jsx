import { useState, useRef, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import reports from "../data/reports.json";
import ModalImages from "../components/ModalImages";
import { Minus, Plus, Zoom } from "../icons/iconsComponents";

const Reports = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenLis, setIsOpenList] = useState(false);
  const [filter, setFilter] = useState("");
  const contentRef = useRef(null);

  function onOpenModal(category) {
    setIsModalOpen(true);
    setFilter(category);
  }

  const filteredReports = reports.find(report => report.name === filter);

  const animationProps = useSpring({
    height: isOpenLis ? contentRef.current.scrollHeight : 0,
    opacity: isOpenLis ? 1 : 0,
    overflow: "hidden",
    config: { duration: 800 },
  });

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.height = isOpenLis ? `${contentRef.current.scrollHeight}px` : "0px";
    }
  }, [isOpenLis]);

  return (
    <section className="section">
      <div className="wrapper relative flex flex-col xl:flex-row xl:gap-x-[120px] gap-y-5">
        <div className="section__title--before" />
        <h2 className="max-w-[245px] xl:min-w-[360px] section__title mt-[30px] mb-[10px]">
          Звітність
        </h2>

        <article className="w-full xl:w-[calc(100%-360px-120px)] border-t border-[#EEEEEE] pt-[30px] xl:px-20">
          <div className="w-full flex items-center justify-between py-6 xl:py-0">
            <h2 className={`section__title ${isOpenLis ? "text-red" : "text-black"} mb-6`}>2022</h2>
            <button onClick={() => setIsOpenList(!isOpenLis)}>
              {isOpenLis ? <Minus /> : <Plus />}
            </button>
          </div>

          <animated.div style={animationProps}>
            <div ref={contentRef}>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-[15px]">
                {reports.map(el => (
                  <li key={el.name}>
                    <button
                      onClick={() => onOpenModal(el.name)}
                      className="flex items-center gap-x-[15px] hover:text-red text-sm font-bold uppercase text-left"
                    >
                      <span className="w-[41px] h-[41px] rounded-full border-[#EEEEEE] border-[1px] flex items-center justify-center">
                        <Zoom />
                      </span>
                      {el.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </animated.div>
        </article>
      </div>
      {isModalOpen && (
        <ModalImages clickFn={() => setIsModalOpen(false)} items={filteredReports.images} />
      )}
    </section>
  );
};

export default Reports;

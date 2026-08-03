import Link from "next/link";
export default function Home() {
  return (
    <>
      <section className="hero hero--homepage bg--wave">
        <div className="hero__content">
          <div className="container">
            <div className="hero__text-wrapper">
              <p className="hero__eyebrow">Immigration New Zealand</p>

              <h1 className="hero__title" tabIndex={-1}>
                <span className="hero__title-main">
                  Apply now to visit, study, work or live in New Zealand
                </span>
              </h1>
            </div>
          </div>

          <span className="hero__pattern"></span>
        </div>
      </section>

      <div className="home-page__elemental">
        <section className="block bg newsannouncementsblock bg--grey">
          <div className="container block__container" id="e3346">
            <div className="news-announcements-block">
              <div className="news-announcements-block__heading-wrapper">
                <h2 className="news-announcements-block__title">
                  Latest announcements
                </h2>

                <Link
                  href="#"
                  className="btn news-announcements-block__listing-link"
                >
                  All announcements
                </Link>
              </div>

              <ul className="news-announcements-block__list">
                <li className="news-announcements-block__list-item">
                  <Link
                    href="#"
                    className="tile tile--news-announcements"
                  >
                    <span className="tile__date">28 Jul 2026</span>
                    <h3 className="tile__title">
                      From first arrivals to future stars: Young refugees
                      inspired by Spurs
                    </h3>

                    <span className="tile__summary">
                      Recently arrived refugee children and young people at the
                      Māngere Refugee Resettlement Centre swapped their usual
                      routines for football boots and training drills, taking
                      part in a special coaching ses…
                    </span>

                    <ul className="tile__terms">
                      <li className="tile__term">
                        <button className="btn btn--tag listing-tile__topic">
                          Stories
                        </button>
                      </li>

                      <li className="tile__term">
                        <button className="btn btn--tag listing-tile__topic">
                          Media
                        </button>
                      </li>
                    </ul>
                  </Link>
                </li>

                <li className="news-announcements-block__list-item">
                  <Link
                    href="#"
                    className="tile tile--news-announcements"
                  >
                    <span className="tile__date">28 Jul 2026</span>
                    <h3 className="tile__title">
                      Changes announced to the Recognised Seasonal Employer
                      scheme
                    </h3>

                    <span className="tile__summary">
                      The Government has today announced a package of changes to
                      the Recognised Seasonal Employer (RSE) scheme following a
                      review of how the scheme operates.
                    </span>

                    <ul className="tile__terms">
                      <li className="tile__term">
                        <button className="btn btn--tag listing-tile__topic">
                          Media release
                        </button>
                      </li>
                    </ul>
                  </Link>
                </li>

                <li className="news-announcements-block__list-item">
                  <Link
                    href="#"
                    className="tile tile--news-announcements"
                  >
                    <span className="tile__date">22 Jul 2026</span>
                    <h3 className="tile__title">
                      Overview of parent visas and application numbers
                    </h3>

                    <span className="tile__summary">
                      New Zealand offers 2 visa options for parents of New
                      Zealand citizens and residents: the Parent Resident Visa
                      and the Parent Boost Visitor Visa. These visas enable
                      families to spend time together in N…
                    </span>

                    <ul className="tile__terms">
                      <li className="tile__term">
                        <button className="btn btn--tag listing-tile__topic">
                          Common topic
                        </button>
                      </li>

                      <li className="tile__term">
                        <button className="btn btn--tag listing-tile__topic">
                          Join or bring family
                        </button>
                      </li>
                    </ul>
                  </Link>
                </li>
              </ul>

              <Link
                href="#"
                className="btn news-announcements-block__listing-link"
              >
                All announcements
              </Link>


            </div>
          </div>
        </section>

        <section className="block bg visatileblock bg--white">
          <div className="container block__container" id="e3355">
            <div className="visa-tile-block">
              <div className="visa-tile-block__heading-wrapper">
                <h2 className="visa-tile-block__title">Top visas</h2>
              </div>

              <ul className="visa-tile-block__list visa-tile-block__list--4">
                <li className="visa-tile-block__list-item">
                  <Link href="#" className="tile tile--visa">
                    <h3 className="tile__title">Visitor Visa</h3>

                    <span className="tile__summary">
                      People travelling on a passport from some countries must
                      apply for a Visitor Visa to visit New Zealand. You can
                      stay for up to either 6 months or 9 months. You cannot
                      work, but you can study for up to…
                    </span>
                  </Link>
                </li>

                <li className="visa-tile-block__list-item">
                  <Link
                    href="#"
                    className="tile tile--visa"
                  >
                    <h3 className="tile__title">
                      New Zealand Electronic Travel Authority (NZeTA)
                    </h3>

                    <span className="tile__summary">
                      Some people can use an NZeTA to travel to New Zealand
                      without applying for a visa first. This depends on your
                      passport, how you are travelling and if you are visiting
                      or only transiting.
                    </span>
                  </Link>
                </li>

                <li className="visa-tile-block__list-item">
                  <Link
                    href="#"
                    className="tile tile--visa"
                  >
                    <h3 className="tile__title">Business Visitor Visa</h3>

                    <span className="tile__summary">
                      Apply for this visa if you want to visit New Zealand for
                      business reasons. You must have enough money to live on
                      while you are here or have the financial support of your
                      employer.
                    </span>
                  </Link>
                </li>

                <li className="visa-tile-block__list-item">
                  <Link href="#" className="tile tile--visa">
                    <h3 className="tile__title">Transit Visa</h3>

                    <span className="tile__summary">
                      If you are passing through Auckland International Airport
                      you must have a Transit Visa unless you already have a
                      valid visa, are from a visa waiver country or transit visa
                      waiver country, or are trave…
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="block bg visa-find-block">
          <div className="container block__container" id="e3354">
            <h2 className="visa-find-block__title">Find a visa</h2>

            <form className="visa-find-block__form">
              <div className="visa-find-block__field">
                <div id="visa-find-step-first-step" className="visa-find-step">
                  <label
                    htmlFor="visa-find-step-input-first-step"
                    className="visa-find-step__question-label"
                  >
                    I would like a New Zealand visa to
                  </label>

                  <span>
                    <div
                      dir="auto"
                      className="v-select vs--single vs--searchable v-select--visa-step"
                    >
                      <div
                        id="vs2__combobox"
                        className="vs__dropdown-toggle"
                        role="combobox" aria-expanded="false" aria-owns="vs2__listbox"
                        aria-controls="vs2__listbox"
                        aria-label=""
                      >
                        <div className="vs__selected-options">
                          <div className="vs__input-box">
                            <input
                              className="vs__search vs__search_position"
                              placeholder="select"
                              id="visa-find-step-input-first-step"
                              aria-autocomplete="list"
                              aria-labelledby="vs2__combobox"
                              aria-controls="vs2__listbox"
                              type="search"
                              autoComplete="off"
                              defaultValue=""
                            />
                          </div>
                        </div>
                        <div className="vs__actions">
                          <button
                            type="button"
                            className="vs__clear"
                            title="Clear Selected"
                            aria-label="Clear Selected"
                            style={{ display: "none" }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="#888888"
                                d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
                              ></path>
                            </svg>
                          </button>
                          <span
                            role="presentation"
                            className="vs__open-indicator"
                          >
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              width="12"
                              height="9"
                              viewBox="0 0 12 9"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.004 5.228 6.008 8.5 3.004 5.22A412.023 412.023 0 0 1 0 1.92c0-.01.289-.333.642-.719L1.284.5l2.358 2.575a255.804 255.804 0 0 0 2.374 2.576c.01 0 1.072-1.153 2.363-2.562L10.724.527l.638.696c.35.384.638.705.638.715 0 .01-1.348 1.49-2.996 3.29Z"></path>
                            </svg>
                          </span>
                          <div
                            className="vs__spinner"
                            style={{ display: "none" }}
                          >
                            Loading...
                          </div>
                        </div>
                      </div>
                      <ul
                        id="vs2__listbox"
                        role="listbox"
                        style={{ display: "none", visibility: "hidden" }}
                      ></ul>
                    </div>
                  </span>
                </div>
              </div>
            </form>

            <Link
              id="visa-find-block-result-link"
              href="#"
              className="btn btn--white visa-find-block__listing-link"
            >
              View visa options
            </Link>


          </div>
        </section>

        <section className="block bg tileblock bg--white">
          <div className="container block__container" id="e1">
            <div className="tile-block">
              <div className="tile-block__list-wrapper">
                <ul className="tile-block__list">
                  <li className="tile-block__list-item">
                    <Link
                      href="#"
                      className="tile"
                      data-not-external-icon="true"
                    >
                      <div className="tile__image-wrapper">
                        <picture className="tile__picture">
                          <source
                            media="(min-width: 768px)"
                            srcSet="/images/home/VISIT_5HAY5041Travis-HaytoTravis-HAYTO-copy__FocusFillWyIwLjAwIiwiMC4wMCIsOTkyLDY2MV0.jpg 1x, /images/home/VISIT_5HAY5041Travis-HaytoTravis-HAYTO-copy.jpg 2x"
                          />
                          <source
                            media="(min-width: 576px)"
                            srcSet="/images/home/VISIT_5HAY5041Travis-HaytoTravis-HAYTO-copy__FocusFillWyIwLjAwIiwiMC4wMCIsNzY4LDUxMl0.jpg 1x, /images/home/VISIT_5HAY5041Travis-HaytoTravis-HAYTO-copy__FocusFillWyIwLjAwIiwiMC4wMCIsMTUzNiwxMDI0XQ.jpg 2x"
                          />
                          <source
                            media="(max-width: 575px)"
                            srcSet="/images/home/VISIT_5HAY5041Travis-HaytoTravis-HAYTO-copy__FocusFillWyIwLjAwIiwiMC4wMCIsNTc2LDM4NF0.jpg 1x, /images/home/VISIT_5HAY5041Travis-HaytoTravis-HAYTO-copy__FocusFillWyIwLjAwIiwiMC4wMCIsMTE1Miw3Njhd.jpg 2x"
                          />
                          <img
                            src="/images/home/VISIT_5HAY5041Travis-HaytoTravis-HAYTO-copy__FocusFillWyIwLjAwIiwiMC4wMCIsNTc2LDM4NF0.jpg"
                            alt=""
                            className="tile__image"
                            loading="lazy"
                          />
                        </picture>
                        <span className="tile__arrow">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none">
                            <path
                              d="M1 10.5h25M16.476 1 26 10.524l-9.524 9.524"
                              stroke="#fff"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>
                      </div>
                      <div className="tile__content">
                        <div className="tile__title-wrapper">
                          <h2 className="tile__title">Visit</h2>
                        </div>

                        <p className="tile__text">
                          Find visitor visas to visit Aotearoa New Zealand on
                          holiday, business or a working holiday.
                        </p>
                      </div>
                    </Link>
                  </li>

                  <li className="tile-block__list-item">
                    <Link
                      href="#"
                      className="tile"
                      data-not-external-icon="true"
                    >
                      <div className="tile__image-wrapper">
                        <picture className="tile__picture">
                          <source
                            media="(min-width: 768px)"
                            srcSet="/images/home/STUDY_Ara_Education_3H3A5156__FocusFillWyIwLjAwIiwiMC4wMCIsOTkyLDY2MV0.jpg 1x, /images/home/STUDY_Ara_Education_3H3A5156.jpg 2x"
                          />
                          <source
                            media="(min-width: 576px)"
                            srcSet="/images/home/STUDY_Ara_Education_3H3A5156__FocusFillWyIwLjAwIiwiMC4wMCIsNzY4LDUxMl0.jpg 1x, /images/home/STUDY_Ara_Education_3H3A5156__FocusFillWyIwLjAwIiwiMC4wMCIsMTUzNiwxMDI0XQ.jpg 2x"
                          />
                          <source
                            media="(max-width: 575px)"
                            srcSet="/images/home/STUDY_Ara_Education_3H3A5156__FocusFillWyIwLjAwIiwiMC4wMCIsNTc2LDM4NF0.jpg 1x, /images/home/STUDY_Ara_Education_3H3A5156__FocusFillWyIwLjAwIiwiMC4wMCIsMTE1Miw3Njhd.jpg 2x"
                          />
                          <img
                            src="/images/home/STUDY_Ara_Education_3H3A5156__FocusFillWyIwLjAwIiwiMC4wMCIsNTc2LDM4NF0.jpg"
                            alt=""
                            className="tile__image"
                            loading="lazy"
                          />
                        </picture>
                        <span className="tile__arrow">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none">
                            <path
                              d="M1 10.5h25M16.476 1 26 10.524l-9.524 9.524"
                              stroke="#fff"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>
                      </div>
                      <div className="tile__content">
                        <div className="tile__title-wrapper">
                          <h2 className="tile__title">Study</h2>
                        </div>

                        <p className="tile__text">
                          Find study visas to study in Aotearoa New Zealand.
                          Education providers – learn about getting approval to
                          be an approved education provider.
                        </p>
                      </div>
                    </Link>
                  </li>

                  <li className="tile-block__list-item">
                    <Link
                      href="#"
                      className="tile"
                      data-not-external-icon="true"
                    >
                      <div className="tile__image-wrapper">
                        <picture className="tile__picture">
                          <source
                            media="(min-width: 768px)"
                            srcSet="/images/home/WORK_NZStory_EnergyMakaraWindFarm_CSA9994_1__FocusFillWyIwLjAwIiwiMC4wMCIsOTkyLDY2MV0.jpg 1x, /images/home/WORK_NZStory_EnergyMakaraWindFarm_CSA9994_1.jpg 2x"
                          />
                          <source
                            media="(min-width: 576px)"
                            srcSet="/images/home/WORK_NZStory_EnergyMakaraWindFarm_CSA9994_1__FocusFillWyIwLjAwIiwiMC4wMCIsNzY4LDUxMl0.jpg 1x, /images/home/WORK_NZStory_EnergyMakaraWindFarm_CSA9994_1__FocusFillWyIwLjAwIiwiMC4wMCIsMTUzNiwxMDI0XQ.jpg 2x"
                          />
                          <source
                            media="(max-width: 575px)"
                            srcSet="/images/home/WORK_NZStory_EnergyMakaraWindFarm_CSA9994_1__FocusFillWyIwLjAwIiwiMC4wMCIsNTc2LDM4NF0.jpg 1x, /images/home/WORK_NZStory_EnergyMakaraWindFarm_CSA9994_1__FocusFillWyIwLjAwIiwiMC4wMCIsMTE1Miw3Njhd.jpg 2x"
                          />
                          <img
                            src="/images/home/WORK_NZStory_EnergyMakaraWindFarm_CSA9994_1__FocusFillWyIwLjAwIiwiMC4wMCIsNTc2LDM4NF0.jpg"
                            alt=""
                            className="tile__image"
                            loading="lazy"
                          />
                        </picture>
                        <span className="tile__arrow">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none">
                            <path
                              d="M1 10.5h25M16.476 1 26 10.524l-9.524 9.524"
                              stroke="#fff"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>
                      </div>
                      <div className="tile__content">
                        <div className="tile__title-wrapper">
                          <h2 className="tile__title">Work</h2>
                        </div>

                        <p className="tile__text">
                          Find visas and information about working in Aotearoa
                          New Zealand. Employers – learn about hiring people
                          from overseas and getting accredited.
                        </p>
                      </div>
                    </Link>
                  </li>

                  <li className="tile-block__list-item">
                    <Link
                      href="#"
                      className="tile"
                      data-not-external-icon="true"
                    >
                      <div className="tile__image-wrapper">
                        <picture className="tile__picture">
                          <source
                            media="(min-width: 768px)"
                            srcSet="/images/home/2Live160384-family-leaving-the-house-v2__FocusFillWyIwLjAwIiwiMC4wMCIsOTkyLDY2MV0.jpg 1x, /images/home/2Live160384-family-leaving-the-house-v2__FocusFillWyIwLjAwIiwiMC4wMCIsMTk4NCwxMzIyXQ.jpg 2x"
                          />
                          <source
                            media="(min-width: 576px)"
                            srcSet="/images/home/2Live160384-family-leaving-the-house-v2__FocusFillWyIwLjAwIiwiMC4wMCIsNzY4LDUxMl0.jpg 1x, /images/home/2Live160384-family-leaving-the-house-v2__FocusFillWyIwLjAwIiwiMC4wMCIsMTUzNiwxMDI0XQ.jpg 2x"
                          />
                          <source
                            media="(max-width: 575px)"
                            srcSet="/images/home/2Live160384-family-leaving-the-house-v2__FocusFillWyIwLjAwIiwiMC4wMCIsNTc2LDM4NF0.jpg 1x, /images/home/2Live160384-family-leaving-the-house-v2__FocusFillWyIwLjAwIiwiMC4wMCIsMTE1Miw3Njhd.jpg 2x"
                          />
                          <img
                            src="/images/home/2Live160384-family-leaving-the-house-v2__FocusFillWyIwLjAwIiwiMC4wMCIsNTc2LDM4NF0.jpg"
                            alt=""
                            className="tile__image"
                            loading="lazy"
                          />
                        </picture>
                        <span className="tile__arrow">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none">
                            <path
                              d="M1 10.5h25M16.476 1 26 10.524l-9.524 9.524"
                              stroke="#fff"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>
                      </div>
                      <div className="tile__content">
                        <div className="tile__title-wrapper">
                          <h2 className="tile__title">Live</h2>
                        </div>

                        <p className="tile__text">
                          Find visas to live in Aotearoa New Zealand. Get
                          information about living here permanently and what
                          life in Aotearoa is like.
                        </p>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

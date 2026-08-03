import Link from "next/link";

export default function AboutUsPage() {
  return (
    <>
      <section className="hero hero--landingpage">
        <div className="hero__content">
          <div className="hero__content-breadcrumbs">
            <div className="container">
              <nav
                className="breadcrumbs breadcrumbs--landingpage"
                aria-label="Breadcrumbs"
              >
                <ol className="breadcrumbs__list">
                  <li className="breadcrumbs__list-item breadcrumbs__list-item--home">
                    <Link href="/" className="breadcrumbs__item-link">
                      {" "}
                      Home{" "}
                    </Link>
                    <span
                      aria-hidden="true"
                      className="breadcrumbs__item-separator breadcrumbs__item-separator--home-ellipsis"
                    >
                      {" "}
                      ...{" "}
                    </span>
                    <span
                      aria-hidden="true"
                      className="breadcrumbs__item-separator"
                    >
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        viewBox="0 0 12 9"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.004 5.228 6.008 8.5 3.004 5.22A412.023 412.023 0 0 1 0 1.92c0-.01.289-.333.642-.719L1.284.5l2.358 2.575a255.804 255.804 0 0 0 2.374 2.576c.01 0 1.072-1.153 2.363-2.562L10.724.527l.638.696c.35.384.638.705.638.715 0 .01-1.348 1.49-2.996 3.29Z"></path>
                      </svg>
                    </span>
                  </li>
                  <li
                    className="breadcrumbs__list-item breadcrumbs__list-item--current"
                    aria-current="page"
                  >
                    {" "}
                    About us{" "}
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          <div className="container hero__container-flex">
            <div className="hero__text-wrapper">
              <h1 className="hero__title" tabIndex={-1}>
                <span className="hero__title-main"> About us </span>
              </h1>
            </div>
          </div>
        </div>
        <span className="hero__pattern"></span>
      </section>
      <div className="landing-page__elemental">
        <section className="block bg childpagetileblock">
          <div className="container block__container" id="e5262">
            <div className="tile-block">
              <div className="tile-block__list-wrapper">
                <ul className="tile-block__list tile-block__list--odd tile-block__list--9 tile-block__list--full">
                  <li className="tile-block__list-item">
                    <Link
                      href="#"
                      className="tile"
                      data-not-external-icon=""
                    >
                      <div className="tile__content">
                        <div className="tile__title-wrapper">
                          <h2 className="tile__title">
                            <span className="tile__first-words">News </span>
                            <span className="tile__title-icon-wrapper">
                              <span className="tile__last-word">centre</span>
                              <span className="tile__arrow">
                                <svg
                                  aria-hidden="true"
                                  focusable="false"
                                  viewBox="0 0 23 17"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="m14.635 16.255 7.944-7.15a.812.812 0 0 0 .278-.605.813.813 0 0 0-.278-.605L14.635.748A.99.99 0 0 0 13.97.5c-.245 0-.49.085-.676.252a.793.793 0 0 0-.005 1.206l6.322 5.685H.952C.427 7.643 0 8.027 0 8.5s.427.857.952.857h18.66l-6.324 5.686a.793.793 0 0 0 .007 1.204c.188.169.434.253.677.253.242 0 .48-.082.663-.245Z"></path>
                                </svg>
                              </span>
                            </span>
                          </h2>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="tile-block__list-item">
                    <Link
                      href="#"
                      className="tile"
                      data-not-external-icon=""
                    >
                      <div className="tile__content">
                        <div className="tile__title-wrapper">
                          <h2 className="tile__title">
                            <span className="tile__first-words">How we </span>
                            <span className="tile__title-icon-wrapper">
                              <span className="tile__last-word">work</span>
                              <span className="tile__arrow">
                                <svg
                                  aria-hidden="true"
                                  focusable="false"
                                  viewBox="0 0 23 17"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="m14.635 16.255 7.944-7.15a.812.812 0 0 0 .278-.605.813.813 0 0 0-.278-.605L14.635.748A.99.99 0 0 0 13.97.5c-.245 0-.49.085-.676.252a.793.793 0 0 0-.005 1.206l6.322 5.685H.952C.427 7.643 0 8.027 0 8.5s.427.857.952.857h18.66l-6.324 5.686a.793.793 0 0 0 .007 1.204c.188.169.434.253.677.253.242 0 .48-.082.663-.245Z"></path>
                                </svg>
                              </span>
                            </span>
                          </h2>
                        </div>
                        <p className="tile__text">
                          {" "}
                          Immigration New Zealand is the operational processing
                          arm of New Zealand’s immigration system. Our ambition
                          is to provide a trusted and effective immigration
                          service for all our customers.{" "}
                        </p>
                      </div>
                    </Link>
                  </li>
                  <li className="tile-block__list-item">
                    <Link
                      href="#"
                      className="tile"
                      data-not-external-icon=""
                    >
                      <div className="tile__content">
                        <div className="tile__title-wrapper">
                          <h2 className="tile__title">
                            <span className="tile__first-words">
                              Our strategies and{" "}
                            </span>
                            <span className="tile__title-icon-wrapper">
                              <span className="tile__last-word">
                                programmes
                              </span>
                              <span className="tile__arrow">
                                <svg
                                  aria-hidden="true"
                                  focusable="false"
                                  viewBox="0 0 23 17"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="m14.635 16.255 7.944-7.15a.812.812 0 0 0 .278-.605.813.813 0 0 0-.278-.605L14.635.748A.99.99 0 0 0 13.97.5c-.245 0-.49.085-.676.252a.793.793 0 0 0-.005 1.206l6.322 5.685H.952C.427 7.643 0 8.027 0 8.5s.427.857.952.857h18.66l-6.324 5.686a.793.793 0 0 0 .007 1.204c.188.169.434.253.677.253.242 0 .48-.082.663-.245Z"></path>
                                </svg>
                              </span>
                            </span>
                          </h2>
                        </div>
                        <p className="tile__text">
                          {" "}
                          Immigration New Zealand runs a range of programmes,
                          including improving services for customers, helping
                          migrants make New Zealand their home, and stopping
                          immigration fraud and exploitation.{" "}
                        </p>
                      </div>
                    </Link>
                  </li>
                  <li className="tile-block__list-item">
                    <Link
                      href="#"
                      className="tile"
                      data-not-external-icon=""
                    >
                      <div className="tile__content">
                        <div className="tile__title-wrapper">
                          <h2 className="tile__title">
                            <span className="tile__first-words">
                              International{" "}
                            </span>
                            <span className="tile__title-icon-wrapper">
                              <span className="tile__last-word">
                                cooperation
                              </span>
                              <span className="tile__arrow">
                                <svg
                                  aria-hidden="true"
                                  focusable="false"
                                  viewBox="0 0 23 17"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="m14.635 16.255 7.944-7.15a.812.812 0 0 0 .278-.605.813.813 0 0 0-.278-.605L14.635.748A.99.99 0 0 0 13.97.5c-.245 0-.49.085-.676.252a.793.793 0 0 0-.005 1.206l6.322 5.685H.952C.427 7.643 0 8.027 0 8.5s.427.857.952.857h18.66l-6.324 5.686a.793.793 0 0 0 .007 1.204c.188.169.434.253.677.253.242 0 .48-.082.663-.245Z"></path>
                                </svg>
                              </span>
                            </span>
                          </h2>
                        </div>
                        <p className="tile__text">
                          {" "}
                          We work with different countries and international
                          organisations to improve the delivery of immigration
                          services, resettle refugees and enhance border
                          security.{" "}
                        </p>
                      </div>
                    </Link>
                  </li>
                  <li className="tile-block__list-item">
                    <Link
                      href="#"
                      className="tile"
                      data-not-external-icon=""
                    >
                      <div className="tile__content">
                        <div className="tile__title-wrapper">
                          <h2 className="tile__title">
                            <span className="tile__first-words">
                              Information for industry, embassies and{" "}
                            </span>
                            <span className="tile__title-icon-wrapper">
                              <span className="tile__last-word">
                                consulates
                              </span>
                              <span className="tile__arrow">
                                <svg
                                  aria-hidden="true"
                                  focusable="false"
                                  viewBox="0 0 23 17"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="m14.635 16.255 7.944-7.15a.812.812 0 0 0 .278-.605.813.813 0 0 0-.278-.605L14.635.748A.99.99 0 0 0 13.97.5c-.245 0-.49.085-.676.252a.793.793 0 0 0-.005 1.206l6.322 5.685H.952C.427 7.643 0 8.027 0 8.5s.427.857.952.857h18.66l-6.324 5.686a.793.793 0 0 0 .007 1.204c.188.169.434.253.677.253.242 0 .48-.082.663-.245Z"></path>
                                </svg>
                              </span>
                            </span>
                          </h2>
                        </div>
                        <p className="tile__text">
                          {" "}
                          We work with airline carriers, panel physicians and
                          the tourism industry. See our information for these
                          industries below. Embassies and consulates can use our
                          Visa Verification Service to check the status of
                          someone’s visa.
                        </p>
                      </div>
                    </Link>
                  </li>
                  <li className="tile-block__list-item">
                    <Link
                      href="#"
                      className="tile"
                      data-not-external-icon=""
                    >
                      <div className="tile__content">
                        <div className="tile__title-wrapper">
                          <h2 className="tile__title">
                            <span className="tile__first-words">
                              Research and{" "}
                            </span>
                            <span className="tile__title-icon-wrapper">
                              <span className="tile__last-word">
                                statistics
                              </span>
                              <span className="tile__arrow">
                                <svg
                                  aria-hidden="true"
                                  focusable="false"
                                  viewBox="0 0 23 17"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="m14.635 16.255 7.944-7.15a.812.812 0 0 0 .278-.605.813.813 0 0 0-.278-.605L14.635.748A.99.99 0 0 0 13.97.5c-.245 0-.49.085-.676.252a.793.793 0 0 0-.005 1.206l6.322 5.685H.952C.427 7.643 0 8.027 0 8.5s.427.857.952.857h18.66l-6.324 5.686a.793.793 0 0 0 .007 1.204c.188.169.434.253.677.253.242 0 .48-.082.663-.245Z"></path>
                                </svg>
                              </span>
                            </span>
                          </h2>
                        </div>
                        <p className="tile__text">
                          {" "}
                          We gather data on all people who come to New Zealand.
                          This helps us create immigration and settlement
                          policies and strategies. We also run monthly customer
                          experience surveys.{" "}
                        </p>
                      </div>
                    </Link>
                  </li>
                  <li className="tile-block__list-item">
                    <Link
                      href="#"
                      className="tile"
                      data-not-external-icon=""
                    >
                      <div className="tile__content">
                        <div className="tile__title-wrapper">
                          <h2 className="tile__title">
                            <span className="tile__first-words">
                              About this{" "}
                            </span>
                            <span className="tile__title-icon-wrapper">
                              <span className="tile__last-word">site</span>
                              <span className="tile__arrow">
                                <svg
                                  aria-hidden="true"
                                  focusable="false"
                                  viewBox="0 0 23 17"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="m14.635 16.255 7.944-7.15a.812.812 0 0 0 .278-.605.813.813 0 0 0-.278-.605L14.635.748A.99.99 0 0 0 13.97.5c-.245 0-.49.085-.676.252a.793.793 0 0 0-.005 1.206l6.322 5.685H.952C.427 7.643 0 8.027 0 8.5s.427.857.952.857h18.66l-6.324 5.686a.793.793 0 0 0 .007 1.204c.188.169.434.253.677.253.242 0 .48-.082.663-.245Z"></path>
                                </svg>
                              </span>
                            </span>
                          </h2>
                        </div>
                        <p className="tile__text">
                          {" "}
                          Learn about our site and the toi Māori designs used on
                          it. Find our terms of use for our website and online
                          systems and learn about how we collect and use
                          information.{" "}
                        </p>
                      </div>
                    </Link>
                  </li>
                  <li className="tile-block__list-item">
                    <Link
                      href="#"
                      className="tile"
                      data-not-external-icon=""
                    >
                      <div className="tile__content">
                        <div className="tile__title-wrapper">
                          <h2 className="tile__title">
                            <span className="tile__first-words"></span>
                            <span className="tile__title-icon-wrapper">
                              <span className="tile__last-word">Glossary</span>
                              <span className="tile__arrow">
                                <svg
                                  aria-hidden="true"
                                  focusable="false"
                                  viewBox="0 0 23 17"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="m14.635 16.255 7.944-7.15a.812.812 0 0 0 .278-.605.813.813 0 0 0-.278-.605L14.635.748A.99.99 0 0 0 13.97.5c-.245 0-.49.085-.676.252a.793.793 0 0 0-.005 1.206l6.322 5.685H.952C.427 7.643 0 8.027 0 8.5s.427.857.952.857h18.66l-6.324 5.686a.793.793 0 0 0 .007 1.204c.188.169.434.253.677.253.242 0 .48-.082.663-.245Z"></path>
                                </svg>
                              </span>
                            </span>
                          </h2>
                        </div>
                        <p className="tile__text">
                          {" "}
                          Terms and definitions of words used on our site,
                          listed alphabetically.{" "}
                        </p>
                      </div>
                    </Link>
                  </li>
                  <li className="tile-block__list-item">
                    <Link
                      href="#"
                      className="tile"
                      data-not-external-icon=""
                    >
                      <div className="tile__content">
                        <div className="tile__title-wrapper">
                          <h2 className="tile__title">
                            <span className="tile__first-words">
                              Immigration policy and{" "}
                            </span>
                            <span className="tile__title-icon-wrapper">
                              <span className="tile__last-word">law</span>
                              <span className="tile__arrow">
                                <svg
                                  aria-hidden="true"
                                  focusable="false"
                                  viewBox="0 0 23 17"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="m14.635 16.255 7.944-7.15a.812.812 0 0 0 .278-.605.813.813 0 0 0-.278-.605L14.635.748A.99.99 0 0 0 13.97.5c-.245 0-.49.085-.676.252a.793.793 0 0 0-.005 1.206l6.322 5.685H.952C.427 7.643 0 8.027 0 8.5s.427.857.952.857h18.66l-6.324 5.686a.793.793 0 0 0 .007 1.204c.188.169.434.253.677.253.242 0 .48-.082.663-.245Z"></path>
                                </svg>
                              </span>
                            </span>
                          </h2>
                        </div>
                        <p className="tile__text">
                          {" "}
                          Immigration laws and policies set the rules for people
                          who want to visit, work, study, live, start a
                          business, or invest in New Zealand.{" "}
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

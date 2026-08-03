import Link from 'next/link';

export default function VisitPage() {
  return (
    <>
      <section className="hero hero--landingpage">
    <div className="hero__content">
        <div className="hero__content-breadcrumbs">
            <div className="container">
                <nav className="breadcrumbs breadcrumbs--landingpage" aria-label="Breadcrumbs">
                    <ol className="breadcrumbs__list">
                        <li className="breadcrumbs__list-item breadcrumbs__list-item--home">
                            <Link href="/" className="breadcrumbs__item-link"> Home </Link>
                            <span aria-hidden="true" className="breadcrumbs__item-separator breadcrumbs__item-separator--home-ellipsis"> ... </span>
                            <span aria-hidden="true" className="breadcrumbs__item-separator">
                                <svg aria-hidden="true" focusable="false" viewBox="0 0 12 9" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.004 5.228 6.008 8.5 3.004 5.22A412.023 412.023 0 0 1 0 1.92c0-.01.289-.333.642-.719L1.284.5l2.358 2.575a255.804 255.804 0 0 0 2.374 2.576c.01 0 1.072-1.153 2.363-2.562L10.724.527l.638.696c.35.384.638.705.638.715 0 .01-1.348 1.49-2.996 3.29Z"></path>
                                </svg>
                            </span>
                        </li>
                        <li className="breadcrumbs__list-item breadcrumbs__list-item--current" aria-current="page"> Visit </li>
                    </ol>
                </nav>
            </div>
        </div>
        <div className="container hero__container-flex">
            <div className="hero__text-wrapper">
                <h1 className="hero__title" tabIndex={-1}>
                    <span className="hero__title-main"> Visit </span>
                    <span lang="mi" className="hero__title-te-reo" dir="ltr">Toro</span>
                </h1>
                <p className="hero__summary">Learn what you need to do to visit New Zealand. Find out whether you need a visa or a New Zealand Electronic Travel Authority (NZeTA), and what you must do before travelling here, and on arrival.</p>
            </div>
            <div className="hero__links-wrapper">
                <p className="hero__links-header">Popular pages</p>
                <div>
                    <ul className="hero__links-list">
                        <li className="hero__links-item">
                            <Link href="#" className="btn btn--small btn--secondary"> Visitor Visa </Link>
                        </li>
                        <li className="hero__links-item">
                            <Link href="#" className="btn btn--small btn--secondary"> Visiting on business </Link>
                        </li>
                        <li className="hero__links-item">
                            <Link href="#" className="btn btn--small btn--secondary"> Before you travel </Link>
                        </li>
                        <li className="hero__links-item">
                            <Link href="#" className="btn btn--small btn--secondary"> Check if you need a visa or an NZeTA </Link>
                        </li>
                        <li className="hero__links-item">
                            <Link href="#" className="btn btn--small btn--secondary"> NZeTA information </Link>
                        </li>
                        <li className="hero__links-item">
                            <Link href="#" className="btn btn--small btn--secondary"> Arriving in New Zealand </Link>
                        </li>
                        <li className="hero__links-item">
                            <Link href="#" className="btn btn--small btn--secondary"> Group Visitor Visa </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <span className="hero__pattern"></span>
</section>
<div className="landing-page__elemental">
    <section className="block bg childpagetileblock bg--white">
        <div className="container block__container" id="e5106">
            <div className="tile-block">
                <h2 className="tile-block__title">Visiting New Zealand</h2>
                <div className="tile-block__list-wrapper">
                    <ul className="tile-block__list tile-block__list--odd tile-block__list--5">
                        <li className="tile-block__list-item">
                            <Link href="#" className="tile" data-not-external-icon="">
                                <div className="tile__content">
                                    <div className="tile__title-wrapper">
                                        <h2 className="tile__title">
                                            <span className="tile__first-words">What you need to visit New </span>
                                            <span className="tile__title-icon-wrapper">
                                                <span className="tile__last-word">Zealand</span>
                                                <span className="tile__arrow">
                                                    <svg aria-hidden="true" focusable="false" viewBox="0 0 23 17" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="m14.635 16.255 7.944-7.15a.812.812 0 0 0 .278-.605.813.813 0 0 0-.278-.605L14.635.748A.99.99 0 0 0 13.97.5c-.245 0-.49.085-.676.252a.793.793 0 0 0-.005 1.206l6.322 5.685H.952C.427 7.643 0 8.027 0 8.5s.427.857.952.857h18.66l-6.324 5.686a.793.793 0 0 0 .007 1.204c.188.169.434.253.677.253.242 0 .48-.082.663-.245Z"></path>
                                                    </svg>
                                                </span>
                                            </span>
                                        </h2>
                                    </div>
                                    <p className="tile__text"> Check if you need a visa or a New Zealand Electronic Travel Authority (NZeTA) to visit New Zealand. Find out what the rules are for Australian citizens and permanent residents. </p>
                                </div>
                            </Link>
                        </li>
                        <li className="tile-block__list-item">
                            <Link href="#" className="tile" data-not-external-icon="">
                                <div className="tile__content">
                                    <div className="tile__title-wrapper">
                                        <h2 className="tile__title">
                                            <span className="tile__first-words">Checking or changing the conditions of your visitor visa or </span>
                                            <span className="tile__title-icon-wrapper">
                                                <span className="tile__last-word">NZeTA</span>
                                                <span className="tile__arrow">
                                                    <svg aria-hidden="true" focusable="false" viewBox="0 0 23 17" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="m14.635 16.255 7.944-7.15a.812.812 0 0 0 .278-.605.813.813 0 0 0-.278-.605L14.635.748A.99.99 0 0 0 13.97.5c-.245 0-.49.085-.676.252a.793.793 0 0 0-.005 1.206l6.322 5.685H.952C.427 7.643 0 8.027 0 8.5s.427.857.952.857h18.66l-6.324 5.686a.793.793 0 0 0 .007 1.204c.188.169.434.253.677.253.242 0 .48-.082.663-.245Z"></path>
                                                    </svg>
                                                </span>
                                            </span>
                                        </h2>
                                    </div>
                                    <p className="tile__text"> Find out how to check the conditions of your visitor visa and if you can work remotely on a visitor visa. Learn how to apply to change the conditions of your visa, or make a change to your New Zealand Electronic Travel Authority (NZeTA). </p>
                                </div>
                            </Link>
                        </li>
                        <li className="tile-block__list-item">
                            <Link href="#" className="tile" data-not-external-icon="">
                                <div className="tile__content">
                                    <div className="tile__title-wrapper">
                                        <h2 className="tile__title">
                                            <span className="tile__first-words">Visiting on </span>
                                            <span className="tile__title-icon-wrapper">
                                                <span className="tile__last-word">business</span>
                                                <span className="tile__arrow">
                                                    <svg aria-hidden="true" focusable="false" viewBox="0 0 23 17" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="m14.635 16.255 7.944-7.15a.812.812 0 0 0 .278-.605.813.813 0 0 0-.278-.605L14.635.748A.99.99 0 0 0 13.97.5c-.245 0-.49.085-.676.252a.793.793 0 0 0-.005 1.206l6.322 5.685H.952C.427 7.643 0 8.027 0 8.5s.427.857.952.857h18.66l-6.324 5.686a.793.793 0 0 0 .007 1.204c.188.169.434.253.677.253.242 0 .48-.082.663-.245Z"></path>
                                                    </svg>
                                                </span>
                                            </span>
                                        </h2>
                                    </div>
                                    <p className="tile__text"> Learn about coming to New Zealand on business or applying for an Asia-Pacific Economic Cooperation (APEC) Business Travel Card. Find out how to get approval for your arts or music festival to make it easy for performers and staff to come to New Zealand. </p>
                                </div>
                            </Link>
                        </li>
                        <li className="tile-block__list-item">
                            <Link href="#" className="tile" data-not-external-icon="">
                                <div className="tile__content">
                                    <div className="tile__title-wrapper">
                                        <h2 className="tile__title">
                                            <span className="tile__first-words">Transiting through New </span>
                                            <span className="tile__title-icon-wrapper">
                                                <span className="tile__last-word">Zealand</span>
                                                <span className="tile__arrow">
                                                    <svg aria-hidden="true" focusable="false" viewBox="0 0 23 17" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="m14.635 16.255 7.944-7.15a.812.812 0 0 0 .278-.605.813.813 0 0 0-.278-.605L14.635.748A.99.99 0 0 0 13.97.5c-.245 0-.49.085-.676.252a.793.793 0 0 0-.005 1.206l6.322 5.685H.952C.427 7.643 0 8.027 0 8.5s.427.857.952.857h18.66l-6.324 5.686a.793.793 0 0 0 .007 1.204c.188.169.434.253.677.253.242 0 .48-.082.663-.245Z"></path>
                                                    </svg>
                                                </span>
                                            </span>
                                        </h2>
                                    </div>
                                    <p className="tile__text"> Find out if you need a transit visa or a New Zealand Electronic Travel Authority (NZeTA) if you are transiting through Auckland International Airport. </p>
                                </div>
                            </Link>
                        </li>
                        <li className="tile-block__list-item">
                            <Link href="#" className="tile" data-not-external-icon="">
                                <div className="tile__content">
                                    <div className="tile__title-wrapper">
                                        <h2 className="tile__title">
                                            <span className="tile__first-words">Crew travelling to New </span>
                                            <span className="tile__title-icon-wrapper">
                                                <span className="tile__last-word">Zealand</span>
                                                <span className="tile__arrow">
                                                    <svg aria-hidden="true" focusable="false" viewBox="0 0 23 17" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="m14.635 16.255 7.944-7.15a.812.812 0 0 0 .278-.605.813.813 0 0 0-.278-.605L14.635.748A.99.99 0 0 0 13.97.5c-.245 0-.49.085-.676.252a.793.793 0 0 0-.005 1.206l6.322 5.685H.952C.427 7.643 0 8.027 0 8.5s.427.857.952.857h18.66l-6.324 5.686a.793.793 0 0 0 .007 1.204c.188.169.434.253.677.253.242 0 .48-.082.663-.245Z"></path>
                                                    </svg>
                                                </span>
                                            </span>
                                        </h2>
                                    </div>
                                    <p className="tile__text"> Learn about visa requirements for crew of passenger airlines, cruise ships, cargo ships, fishing vessels, and private yachts and planes. </p>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
    <section className="block bg visa-find-block">
        <div className="container block__container" id="e2705">
            <h2 className="visa-find-block__title"> Find a visa </h2>
            <form className="visa-find-block__form">
                <div className="visa-find-block__field">
                    <div id="visa-find-step-first-step" className="visa-find-step">
                        <label htmlFor="visa-find-step-input-first-step" className="visa-find-step__question-label">I would like a New Zealand visa to</label>
                        <span>
                            <div dir="auto" className="v-select vs--single vs--searchable v-select--visa-step" style={{'--multiselect-visa-step-dropdown-left-position': '-20px', '--multiselect-visa-step-dropdown-right-position': '-334.78125px'} as any}>
                                <div id="vs2__combobox" className="vs__dropdown-toggle" role="combobox" aria-expanded="false" aria-owns="vs2__listbox"
                        aria-controls="vs2__listbox" aria-label="">
                                    <div className="vs__selected-options">
                                        <span className="vs__selected">visit or extend a visit</span>
                                        <div className="vs__input-box">
                                            <input className="vs__search vs__search_position" id="visa-find-step-input-first-step" aria-autocomplete="list" aria-labelledby="vs2__combobox" aria-controls="vs2__listbox" type="search" autoComplete="off" defaultValue="" />
                                        </div>
                                    </div>
                                    <div className="vs__actions">
                                        <button type="button" className="vs__clear" title="Clear Selected" aria-label="Clear Selected" style={{display: 'none'}}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                                <path fill="#888888" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"></path>
                                            </svg>
                                        </button>
                                        <span role="presentation" className="vs__open-indicator">
                                            <svg aria-hidden="true" focusable="false" width="12" height="9" viewBox="0 0 12 9" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9.004 5.228 6.008 8.5 3.004 5.22A412.023 412.023 0 0 1 0 1.92c0-.01.289-.333.642-.719L1.284.5l2.358 2.575a255.804 255.804 0 0 0 2.374 2.576c.01 0 1.072-1.153 2.363-2.562L10.724.527l.638.696c.35.384.638.705.638.715 0 .01-1.348 1.49-2.996 3.29Z"></path>
                                            </svg>
                                        </span>
                                        <div className="vs__spinner" style={{display: 'none'}}>Loading...</div>
                                    </div>
                                </div>
                                <ul id="vs2__listbox" role="listbox" style={{display: 'none', visibility: 'hidden'}}></ul>
                            </div>
                        </span>
                        
                        <div id="visa-find-step-visit-1" className="visa-find-step visa-find-step--next">
                            <label htmlFor="visa-find-step-input-visit-1" className="visa-find-step__question-label">I am travelling on a passport from</label>
                            <span>
                                <div dir="auto" className="v-select vs--single vs--searchable v-select--visa-step" style={{'--multiselect-visa-step-dropdown-left-position': '-451.0625px', '--multiselect-visa-step-dropdown-right-position': '-102.9375px'} as any}>
                                    <div id="vs4__combobox" className="vs__dropdown-toggle" role="combobox" aria-expanded="false" aria-owns="vs4__listbox"
                        aria-controls="vs4__listbox" aria-label="">
                                        <div className="vs__selected-options">
                                            <div className="vs__input-box">
                                                <input className="vs__search vs__search_position" placeholder="select" id="visa-find-step-input-visit-1" aria-autocomplete="list" aria-labelledby="vs4__combobox" aria-controls="vs4__listbox" type="search" autoComplete="off" defaultValue="" />
                                            </div>
                                        </div>
                                        <div className="vs__actions">
                                            <button type="button" className="vs__clear" title="Clear Selected" aria-label="Clear Selected" style={{display: 'none'}}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                                    <path fill="#888888" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"></path>
                                                </svg>
                                            </button>
                                            <span role="presentation" className="vs__open-indicator">
                                                <svg aria-hidden="true" focusable="false" width="12" height="9" viewBox="0 0 12 9" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M9.004 5.228 6.008 8.5 3.004 5.22A412.023 412.023 0 0 1 0 1.92c0-.01.289-.333.642-.719L1.284.5l2.358 2.575a255.804 255.804 0 0 0 2.374 2.576c.01 0 1.072-1.153 2.363-2.562L10.724.527l.638.696c.35.384.638.705.638.715 0 .01-1.348 1.49-2.996 3.29Z"></path>
                                                </svg>
                                            </span>
                                            <div className="vs__spinner" style={{display: 'none'}}>Loading...</div>
                                        </div>
                                    </div>
                                    <ul id="vs4__listbox" role="listbox" style={{display: 'none', visibility: 'hidden'}}></ul>
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
            </form>
            <Link id="visa-find-block-result-link" href="#" className="btn btn--white visa-find-block__listing-link"> View visa options </Link>

        </div>
    </section>
</div>
    </>
  );
}

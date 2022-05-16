class ResumeBuilder {

    build( resume, rootElement ) {
        if ( resume ) {
            window.document.title = resume.name ? resume.name : 'Resume';

            this.#buildHeader( resume, rootElement );
            this.#buildSkills( resume.skills, rootElement );
            this.#buildExperience( resume.jobs, rootElement );
            this.#buildEducation( resume.education, rootElement );
        }
    }

    #buildEducation( education, parent ) {
        if ( education && education.length ) {
            const educationSection = HtmlBuilder.createDiv(
                'education-section',
                null,
                this.#createSection( 'Education', parent )
            );

            for ( const edItem of education ) {
                let container = HtmlBuilder.createDiv(
                    'education-container',
                    null,
                    educationSection
                );
                HtmlBuilder.createDiv( 'education-school', edItem.name, container );
                HtmlBuilder.createDiv( 'education-location', edItem.location, container );
                HtmlBuilder.addBreak( container );
                HtmlBuilder.createDiv( 'education-degree', edItem.degree, container );
                HtmlBuilder.createDiv( 'education-dates', edItem.dates, container );
            }
        }
    }

    #buildHeader( resume, parent ) {
        const headerContainer = HtmlBuilder.createDiv( 'header-container', null, parent );
        HtmlBuilder.createDiv( 'header-title', resume.name, headerContainer );
        HtmlBuilder.createDiv(
            'header-subtext',
            `${resume.location} - ${resume.email} - Tel: ${resume.telephone}`,
            headerContainer
        );
    }

    #buildSkills( skills, resumeRootElement ) {
        if ( skills ) {
            const skillsElement = this.#createSection( 'Skills', resumeRootElement );
            const skillsContainer = HtmlBuilder.createDiv(
                'skills-container',
                null,
                skillsElement
            );

            for ( let skillGroup in skills ) {
                HtmlBuilder.createDiv( 'skills-title', skillGroup, skillsContainer );
                const items = skills[ skillGroup ];
                const itemsContainer = HtmlBuilder.createDiv(
                    'skills-items',
                    null,
                    skillsContainer
                );
                HtmlBuilder.createList( items, itemsContainer );
                HtmlBuilder.addBreak( skillsContainer );
            }
        }
    }

    #buildExperience( jobs, resumeRootElement ) {
        if ( jobs && jobs.length ) {
            const experienceSectionElement = this.#createSection(
                'Experience',
                resumeRootElement
            );

            let lastJob = null;
            let jobElement = null;
            for ( const job of jobs ) {
                if ( !lastJob || lastJob.companyName !== job.companyName ) {
                    jobElement = HtmlBuilder.createDiv(
                        'job-container',
                        null,
                        experienceSectionElement
                    );
                    HtmlBuilder.createDiv( 'job-company', job.companyName, jobElement );
                    HtmlBuilder.createDiv( 'job-location', job.location, jobElement );
                    HtmlBuilder.addBreak( jobElement );
                }

                HtmlBuilder.createDiv( 'job-name', job.title, jobElement );
                this.#addJobDates( job, jobElement );
                HtmlBuilder.addBreak( jobElement );
                this.#addJobItems( job, jobElement );

                lastJob = job;
            }
        }
    }

    #addJobItems( job, parent ) {
        if ( !job.items ) return;

        const itemsContainer = HtmlBuilder.createDiv( 'job-items', null, parent );
        HtmlBuilder.createList( job.items, itemsContainer );
    }

    #addJobDates( job, parent ) {
        if ( job.startDate ) {
            HtmlBuilder.createDiv(
                'job-dates',
                `${this.#getDateString( job.startDate )} - ${this.#getDateString( job.endDate )}`,
                parent
            );
        }

        return parent;
    }

    #getDateString( date ) {
        if ( !date ) return 'Present';

        if ( date instanceof Date ) {
            return date.toLocaleDateString( undefined, {
                year: 'numeric',
                month: 'short',
            } );
        } else {
            return date.toString();
        }
    }

    #createSection( title, parent ) {
        const root = HtmlBuilder.createDiv( 'section-container', null, parent );
        if ( title ) HtmlBuilder.createDiv( 'section-title', title, root );
        return root;
    }

}

class HtmlBuilder {
    static addBreak( parent ) {
        if ( parent ) {
            const brk = document.createElement( 'div' );
            brk.className = 'break';
            parent.appendChild( brk );
        }
        return parent;
    }

    static createList( items, parent ) {
        const root = HtmlBuilder.createListRoot( null, parent );
        if ( items ) {
            items.forEach( function ( i ) {
                HtmlBuilder.createListItem( null, i, root );
            } );
        }
        return root;
    }

    static createListRoot( className, parent ) {
        return HtmlBuilder.createAndAppendElement( 'ul', className, null, parent );
    }

    static createListItem( className, text, parent ) {
        return HtmlBuilder.createAndAppendElement( 'li', className, text, parent );
    }

    static createDiv( className, text, parent ) {
        return HtmlBuilder.createAndAppendElement( 'div', className, text, parent );
    }

    static createLink( text, url ) {
        const link = document.createElement( 'a' );
        link.textContent = text;
        link.href = url;
        link.target = '_blank';
        return link;
    }

    static createAndAppendElement( elementType, className, text, parent ) {
        const el = document.createElement( elementType );
        if ( className ) el.className = className;
        if ( text ) el.textContent = text;
        if ( parent ) parent.appendChild( el );
        return el;
    }
}
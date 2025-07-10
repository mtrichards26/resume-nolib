class ResumeBuilder {

    build( resume, rootElement ) {
        if ( resume ) {
            window.document.title = resume?.basics?.name ? resume.basics.name : 'Resume';

            this.#buildHeader( resume.basics, rootElement );
            this.#buildSkills( resume.skills, rootElement );
            this.#buildExperience( resume.work, rootElement );
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
                HtmlBuilder.createDiv( 'education-school', edItem.institution, container );
                HtmlBuilder.addBreak( container );
                HtmlBuilder.createDiv( 'education-degree', `${edItem.studyType} ${edItem.area}`, container );
                HtmlBuilder.createDiv( 'education-dates', edItem.endDate, container );
            }
        }
    }

    #buildHeader( basics, parent ) {
        const headerContainer = HtmlBuilder.createDiv( 'header-container', null, parent );
        HtmlBuilder.createDiv( 'header-title', basics.name, headerContainer );

        if ( basics.label ) {
            HtmlBuilder.createDiv( 'header-label', basics.label, headerContainer );
        }

        let subText = `${this.#getLocation( basics )} - ${basics.email}`;
        if ( basics.telephone )
            subText += ` - Tel: ${basics.telephone}`;
        HtmlBuilder.createDiv(
            'header-subtext',
            subText,
            headerContainer
        );

        if ( basics.summary ) {
            HtmlBuilder.createDiv( 'header-summary', basics.summary, headerContainer );
        }
    }

    #getLocation( basics ) {
        let loc = '';
        if ( basics?.location ) {
            if ( basics.location.city )
                loc = basics.location.city;

            if ( basics.location.region )
                loc = `${loc}, ${basics.location.region}`;
        }
        return loc;
    }

    #buildSkills( skills, resumeRootElement ) {
        if ( skills ) {
            const skillsElement = this.#createSection( 'Skills', resumeRootElement );
            const skillsContainer = HtmlBuilder.createDiv(
                'skills-container',
                null,
                skillsElement
            );

            const groupedSkills = skills.reduce( ( acc, cur ) => {
                if ( !acc[ cur.name ] )
                    acc[ cur.name ] = [];

                acc[ cur.name ].push( cur );
                return acc;
            }, {} )

            for ( let skillGroup in groupedSkills ) {
                HtmlBuilder.createDiv( 'skills-title', skillGroup, skillsContainer );
                const items = groupedSkills[ skillGroup ].map( s => `${s.level}: ${s.keywords.join( ', ' )}` );
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
                if ( !lastJob || lastJob.name !== job.name ) {
                    jobElement = HtmlBuilder.createDiv(
                        'job-container',
                        null,
                        experienceSectionElement
                    );
                    HtmlBuilder.createDiv( 'job-company', job.name, jobElement );
                    HtmlBuilder.addBreak( jobElement );
                }

                HtmlBuilder.createDiv( 'job-name', job.position, jobElement );
                this.#addJobDates( job, jobElement );
                HtmlBuilder.addBreak( jobElement );
                this.#addJobItems( job, jobElement );

                lastJob = job;
            }
        }
    }

    #addJobItems( job, parent ) {
        if ( !job.highlights ) return;

        const itemsContainer = HtmlBuilder.createDiv( 'job-items', null, parent );
        HtmlBuilder.createList( job.highlights, itemsContainer );
        HtmlBuilder.addBreak( parent );
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

        const months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
        const dateLength = date.length;
        const parsedDate = new Date( date );
        if ( dateLength < 5 )
            return parsedDate.getUTCFullYear();

        return `${months[ parsedDate.getUTCMonth() ]} ${parsedDate.getUTCFullYear()}`;
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

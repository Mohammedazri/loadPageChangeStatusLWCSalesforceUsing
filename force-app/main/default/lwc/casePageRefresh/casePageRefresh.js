import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import RELOAD_REQUIRED_FIELD from '@salesforce/schema/Case.ReloadRequired__c';

export default class CasePageRefresh extends LightningElement {
    @api recordId; // Record ID passed to this component from the parent record page
    reloadTriggered = false; // In-memory flag for the current session

    // Key for session storage
    sessionKey;

    connectedCallback() {
        // Generate a unique session key for the current record
        this.sessionKey = `casePageReload_${this.recordId}`;
        const reloadState = sessionStorage.getItem(this.sessionKey);
        

        // Check if the page was already reloaded
        if (reloadState === 'true') {
            this.reloadTriggered = true;
        }
    }

    // Wire adapter to fetch the Case record
    @wire(getRecord, { recordId: '$recordId', fields: [RELOAD_REQUIRED_FIELD] })
    caseRecord({ error, data }) {

        alert('je data && !this.reloadTriggered'+(data && !this.reloadTriggered));
        if (data && !this.reloadTriggered) {
            alert('je suis dans la wire dans le case Reecord');
            console.log(`LWC: Fetching record for Case ${this.recordId}`);
            // Mark the page reload state in session storage
            sessionStorage.setItem(this.sessionKey, 'true');

            // Trigger page reload
            console.log('LWC: Reloading the page...');
            this.triggerPageReload();
        } else if (error) {
            console.error('LWC: Error fetching Case record:', error);
        }
    }

    // Reload the page
    triggerPageReload() {
        window.location.reload();
    }
}

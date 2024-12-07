trigger StatusTriggerCase on Case (after update) { 
    for (Case caseRecord : Trigger.new) {
        System.debug('Moh caseRecord.Status'+caseRecord.Status);
        if (caseRecord.Status == 'Working') {
            System.debug('Moh caseRecord.Status'+caseRecord.Status);
            caseRecord.ReloadRequired__c = true;
        }
    }
}
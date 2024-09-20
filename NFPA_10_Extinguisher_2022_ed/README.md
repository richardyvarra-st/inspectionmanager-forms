
# Version Control Update
1/2/24
rptdesign file is v3 in DM records
json file is v1.03 in DM

3/11/24
"area" property added to handheld and wheeled extinguishers.
json and rptdesign files updated with "area" and deficiencies for each question

3/14/24
Added Victory to properties_manufacturer

3/19/24
Fixed Syntax error on load of json to DM.

6.4.24  Updates for NFPA 10 2022 v3
JSON (DM version 1.84)
Added ext. sizes
Added manufacturer
Added status to allow tech to inactivate asset from mobile device
Changed Visible to hide if status inactive
Added Tech License
Added Office License

Middleware
create/update 
update to allow inactive status to update status in Core

.rptdesign  (DM version 2.01)
Added Tech license 
Added Office License

6/6/2024 Updates for both the NFPA 10 2018 ed and the 2021 ed. 
Set Date formats for consistency and fixed display for correct next hydro date. 
Set Inspection Date in both forms to be required questions.

6/11/24 Added Advantage to Mfr listing per customer request

# Installation Instructions
1. Setup InspectionManager Connector and form’s placeholder first. (For reference for setup, please look at this Asana Project [link to be embedded later])
2. Download JSON and .rptdesign files to the customer’s Google Drive folder. 
3. Import JSON file with description of form added. Installed MM/DD/YYYY Current v1.00 (please enter the date installed and version downloaded from the JSON filename | Ex. Installed 12/26/2023 Current 1.00)
4. Upload .rptdesign files to Adobe .pdf to S3 destination.
5. Name description of destination to mirror it’s purpose and version. (Ex. NFPA 10 Combined PDF to ServiceTrade 1.0)
6. Copy dispatch rules destination and dispatch code to corresponding dispatch mapping and destination rule.
7. Dispatch Rule by default: Job Type: Unknown | Service Line: Portable Extinguisher
8. The Destination Name should read Create/Update Assets & Create Deficiencies
9. Mark Asana Task Complete in Project.


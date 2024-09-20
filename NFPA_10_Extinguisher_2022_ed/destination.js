const dateFormat = 'America/New_York';
const searchPropField = 'properties_';
const searchDateKeyWord = '_date';
const deficiencyKeyWord = 'Deficiencies_';
let orderIndex = 0;
let reporterId = SF.answers.servicetrade_technician_id ? SF.answers.servicetrade_technician_id.value : null;

let portables = SF.answers.servicetrade_assets_extinguisher ? SF.answers.servicetrade_assets_extinguisher.values : [];
for (let portable of portables) {
    let portableId = portable.asset_id && portable.asset_id.value ? portable.asset_id.value : null;
    if (!portableId) {
        console.log("PORTABLE DATA", portable);
        const keys = Object.keys(portable);
        const properties = {};
        for (let key of keys) {
            if (key.includes(searchPropField)) {
                properties[key.replace(searchPropField, '')] = key.includes(searchDateKeyWord) ?
                    Moment.tz(portable[key].value, dateFormat).unix() :
                    portable[key].value;
            }
        }
        const portablePayload = {
            locationId: SF.job.location.id,
            type: 'extinguisher',
            orderIndex: orderIndex,
            properties: properties
        };
        if (portable._5_Year_Hydro_Due_Date && portable._5_Year_Hydro_Due_Date.value) {
            portablePayload.properties['5_year_hydro_due_date'] = portable._5_Year_Hydro_Due_Date ? Moment.tz(portable._5_Year_Hydro_Due_Date.value, 'America/New_York').unix() : null;
        }
        if (portable._6_Year_Maintenance_Due_Date && portable._6_Year_Maintenance_Due_Date.value) {
            portablePayload.properties['6_year_test_date'] = portable._6_Year_Maintenance_Due_Date ? Moment.tz(portable._6_Year_Maintenance_Due_Date.value, 'America/New_York').unix() : null;
        }
        if (portable._12_Hydro_Due_Date && portable._12_Hydro_Due_Date.value) {
            portablePayload.properties['12_year_test_date'] = portable._12_Hydro_Due_Date ? Moment.tz(portable._12_Hydro_Due_Date.value, 'America/New_York').unix() : null;
        }

        console.log("PORTABLE TO CREATE", portablePayload);
        const newPortable = await SF.createAssets([portablePayload]);
        console.log("NEWLY CREATED PORTABLE", newPortable[0]);
        portable.asset_id = {
            value: newPortable[0].id
        };
        portableId = newPortable[0].id;
        orderIndex++;
    } else {
        const updatedFields = Object.values(portable).filter(v => v.timestamp);
        const isUpdated = !!updatedFields.length;
        if (isUpdated) {
            const keys = Object.keys(portable);
            const properties = {};
            for (let key of keys) {
                if (key.includes(searchPropField)) {
                    properties[key.replace(searchPropField, '')] = key.includes(searchDateKeyWord) ?
                        Moment.tz(portable[key].value, dateFormat).unix() :
                        portable[key].value;
                }
            }
            const portablePayload = {
                assetId: portableId,
                locationId: SF.job.location.id,
                orderIndex: orderIndex,
                status: portable.status && portable.status.value ? portable.status.value : 'active',
                properties: properties
            };
            if (portable._5_Year_Hydro_Due_Date && portable._5_Year_Hydro_Due_Date.value) {
                portablePayload.properties['5_year_hydro_due_date'] = portable._5_Year_Hydro_Due_Date ? Moment.tz(portable._5_Year_Hydro_Due_Date.value, 'America/New_York').unix() : null;
            }
            if (portable._6_Year_Maintenance_Due_Date && portable._6_Year_Maintenance_Due_Date.value) {
                portablePayload.properties['6_year_test_date'] = portable._6_Year_Maintenance_Due_Date ? Moment.tz(portable._6_Year_Maintenance_Due_Date.value, 'America/New_York').unix() : null;
            }
            if (portable._12_Hydro_Due_Date && portable._12_Hydro_Due_Date.value) {
                portablePayload.properties['12_year_test_date'] = portable._12_Hydro_Due_Date ? Moment.tz(portable._12_Hydro_Due_Date.value, 'America/New_York').unix() : null;
            }
            console.log('UPDATE PORTABLE', portablePayload);
            await SF.updateAssets([portablePayload]);
            orderIndex++;
        }
    }
    const keys = Object.keys(portable);
    for (let key of keys) {
        if (key.includes(deficiencyKeyWord)) {
            const deficiencies = portable[key] && portable[key].values ?  portable[key].values : [];
            for (let def of deficiencies) {
                let deficiencyPayload = {
                    assetId: portableId,
                    severity: def.severity.value,
                    description: def.description.value,
                    status: 'new',
                    reportSource: 'mobile',
                    reporterId: reporterId,
                    jobId: SF.job.id,
                    attachments: []
                };
                let deficiencyPictures = def.Photos && def.Photos.values ? def.Photos.values : [];
                for (let p of deficiencyPictures) {
                    if (p.deficiency_image && p.deficiency_image.value) {
                        deficiencyPayload.attachments.push(p.deficiency_image.value);
                    }
                }
                console.log('Portable deficiency payload', deficiencyPayload);
                await SF.createDeficiencies([deficiencyPayload]);
            }
        }
    }
}

let wheeleds = SF.answers.servicetrade_assets_wheeled_fire_extinguisher ? SF.answers.servicetrade_assets_wheeled_fire_extinguisher.values : [];
for (let wheeled of wheeleds) {
    let wheeledId = wheeled.asset_id && wheeled.asset_id.value ? wheeled.asset_id.value : null;
    if (!wheeledId) {
        console.log("WHEELED DATA", wheeled);
        const keys = Object.keys(wheeled);
        const properties = {};
        for (let key of keys) {
            if (key.includes(searchPropField)) {
                properties[key.replace(searchPropField, '')] = key.includes(searchDateKeyWord) ?
                    Moment.tz(wheeled[key].value, dateFormat).unix() :
                    wheeled[key].value;
            }
        }
        const wheeledPayload = {
            locationId: SF.job.location.id,
            type: 'wheeled_fire_extinguisher',
            orderIndex: orderIndex,
            properties: properties
        };
        if (wheeled._5_Year_Hydro_Due_Date && wheeled._5_Year_Hydro_Due_Date.value) {
            wheeledPayload.properties['5_year_test_date'] = wheeled._5_Year_Hydro_Due_Date ? Moment.tz(wheeled._5_Year_Hydro_Due_Date.value, 'America/New_York').unix() : null;
        }
        if (wheeled._6_Year_Maintenance_Due_Date && wheeled._6_Year_Maintenance_Due_Date.value) {
            wheeledPayload.properties['6_year_test_date'] = wheeled._6_Year_Maintenance_Due_Date ? Moment.tz(wheeled._6_Year_Maintenance_Due_Date.value, 'America/New_York').unix() : null;
        }
        if (wheeled._12_Hydro_Due_Date && wheeled._12_Hydro_Due_Date.value) {
            wheeledPayload.properties['12_year_test_date'] = wheeled._12_Hydro_Due_Date ? Moment.tz(wheeled._12_Hydro_Due_Date.value, 'America/New_York').unix() : null;
        }
        console.log("WHEELED TO CREATE", wheeledPayload);
        const newWheeled = await SF.createAssets([wheeledPayload]);
        console.log("NEWLY CREATED WHEELED", newWheeled[0]);
        wheeled.asset_id = {
            value: newWheeled[0].id
        };
        wheeledId = newWheeled[0].id;
        orderIndex++;
    } else {
        const updatedFields = Object.values(wheeled).filter(v => v.timestamp);
        const isUpdated = !!updatedFields.length;
        if (isUpdated) {
            const keys = Object.keys(wheeled);
            const properties = {};
            for (let key of keys) {
                if (key.includes(searchPropField)) {
                    properties[key.replace(searchPropField, '')] = key.includes(searchDateKeyWord) ?
                        Moment.tz(wheeled[key].value, dateFormat).unix() :
                        wheeled[key].value;
                }
            }
            const wheeledPayload = {
                assetId: wheeledId,
                locationId: SF.job.location.id,
                orderIndex: orderIndex,
                status: wheeled.status && wheeled.status.value ? wheeled.status.value : 'active',
                properties: properties
            };
            if (wheeled._5_Year_Hydro_Due_Date && wheeled._5_Year_Hydro_Due_Date.value) {
                wheeledPayload.properties['5_year_test_date'] = wheeled._5_Year_Hydro_Due_Date ? Moment.tz(wheeled._5_Year_Hydro_Due_Date.value, 'America/New_York').unix() : null;
            }
            if (wheeled._6_Year_Maintenance_Due_Date && wheeled._6_Year_Maintenance_Due_Date.value) {
                wheeledPayload.properties['6_year_test_date'] = wheeled._6_Year_Maintenance_Due_Date ? Moment.tz(wheeled._6_Year_Maintenance_Due_Date.value, 'America/New_York').unix() : null;
            }
            if (wheeled._12_Hydro_Due_Date && wheeled._12_Hydro_Due_Date.value) {
                wheeledPayload.properties['12_year_test_date'] = wheeled._12_Hydro_Due_Date ? Moment.tz(wheeled._12_Hydro_Due_Date.value, 'America/New_York').unix() : null;
            }
            console.log('UPDATE WHEELED', wheeledPayload);
            await SF.updateAssets([wheeledPayload]);
            orderIndex++;
        }
    }
    const keys = Object.keys(wheeled);
    for (let key of keys) {
        if (key.includes(deficiencyKeyWord)) {
            const deficiencies = wheeled[key] && wheeled[key].values ?  wheeled[key].values : [];
            for (let def of deficiencies) {
                let deficiencyPayload = {
                    assetId: wheeledId,
                    severity: def.severity.value,
                    description: def.description.value,
                    status: 'new',
                    reportSource: 'mobile',
                    reporterId: reporterId,
                    jobId: SF.job.id,
                    attachments: []
                };
                let deficiencyPictures = def.Deficiency_Photos && def.Deficiency_Photos.values ? def.Deficiency_Photos.values : [];
                for (let p of deficiencyPictures) {
                    if (p.deficiency_image && p.deficiency_image.value) {
                        deficiencyPayload.attachments.push(p.deficiency_image.value);
                    }
                }
                console.log('Wheeled deficiency payload', deficiencyPayload);
                await SF.createDeficiencies([deficiencyPayload]);
            }
        }
    }
}

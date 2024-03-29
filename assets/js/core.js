document.getElementById("reset").onclick = function () {
    location.reload()
}
document.getElementById("calculate").onclick = function () {

    var lasers_first_combination = document.getElementById("lasers_first_combination").value;
    var lasers_second_combination = document.getElementById("lasers_second_combination").value;
    var lasers_ship_1 = document.getElementById("lasers_ship_1").value;
    var lasers_ship_2 = document.getElementById("lasers_ship_1").value;
    var ship_designs = document.getElementById("ship_designs").value;
    var lasers_drones = document.getElementById("lasers_drones").value;
    var lasers_drones_designs = document.getElementById("lasers_drones_designs").value;
    var resource = document.getElementById("resource").value;
    var booster = document.getElementById("boosters").value;
    var upgrades = document.getElementById("upgrades").value;
    var dronesFormations = document.getElementById("formations").value;
    var type_ammo = document.getElementById("ammo").value;

    var dmg = calculation_dmg(lasers_first_combination, lasers_second_combination, lasers_ship_1, lasers_ship_2, ship_designs,lasers_drones, lasers_drones_designs, resource, booster, dronesFormations, type_ammo, upgrades, "COMPLETE")
    var dmg_without_resources = calculation_dmg(lasers_first_combination, lasers_second_combination, lasers_ship_1, lasers_ship_2, ship_designs,lasers_drones, lasers_drones_designs, resource, booster, dronesFormations, type_ammo, upgrades, "WITHOUT_RESOURCES")
    var dmg_standard = calculation_dmg(lasers_first_combination, lasers_second_combination, lasers_ship_1, lasers_ship_2, ship_designs, lasers_drones, lasers_drones_designs, resource, booster, dronesFormations, type_ammo, upgrades, "STANDARD")

    document.getElementById("standard_result").innerText = "Standardní výpočet bez desingu a formací: " +  dmg_standard + " DMG"
    document.getElementById("without_resources").innerText = "Výsledek bez zdrojů a formace: " +  dmg_without_resources + " DMG"
    document.getElementById("full_result").innerText = "Kompletní výsledek: " +  dmg + " DMG"
}

/**
 * @description Tato metoda vrací procenta dmg podle zvoleného typu laseru,
 * kalkulačka počítá s tím že zvolený laser bude jak v letounu tak v lodi.
 * @return number
 */
function selectLaserDmg(laserTyp) {
    const lasers = [
        {name: "NOTHING", dmg: 0},
        {name: "LF_3", dmg: 175},
        {name: "LF_4", dmg: 200},
        {name: "PROMETHEUS", dmg: 210 + 200}
    ]
    return lasers.filter(subject => subject.name === laserTyp)
        .map((e) => {
            return e.dmg;
    })
}

/**
 * @description Tato metoda vrací procenta dmg podle zvoleného goliáš desingu
 * @return number
 */
function selectShipDesign(shipDesigns) {
    if (ship_designs === undefined)
        return 0

    const data = [
        { name: "NOTHING", dmg: 0 },
        { name: "ENFORCER", dmg: 5 }, 
        { name: "VANQUISHER", dmg: 7 }, 
        { name: "PEACEMAKER", dmg: 7 }, 
        { name: "SOVEREIGN", dmg: 7 }, 
        { name: "SURGEON", dmg: 7 }, 
        { name: "REFEREE", dmg: 5 }, 
        { name: "GOLIATH_CHAMPION", dmg: 5 }, 
        { name: "GOLIATH_X", dmg: 2 }, 
        { name: "DIMINISHER", dmg: 5 }, 
        { name: "VENOM", dmg: 5 }, 
        { name: "CYBORG", dmg: 10 }
    ]

    return data.filter(subject => subject.name === shipDesigns)
        .map((e) => {
            return e.dmg;
    })
}

/**
 * @description Tato metoda vrací procenta dmg z letounových desingů
 * @return number
 */
function selectDroneDesign(lasers_drones_designs) {
    const data = [
        {name: "NOTHING", dmg: 0}, 
        {name: "HERCULES", dmg: 0}, 
        {name: "HAVOC", dmg: 10}
    ]

    return data.filter(subject => subject.name === lasers_drones_designs)
    .map((e) => {
        return e.dmg;
    })
}

/**
 * @description Tato metoda vrací procenta dmg z vesmírných zdrojů 
 * @return number
 */
function selectResources(resource) {    
    const resources = [
        {name: "NOTHING", dmg: 0},
        {name: "PROMERIUM", dmg: 30},
        {name: "SEPROM", dmg: 60}
    ]
    return resources.filter(subject => subject.name === resource)
        .map((e) => {
            return e.dmg;
    })
}

/**
 * @description Tato metoda vybere booster a aplikuje procenta z boosteru
 * @param {String} type_booster 
 * @returns number
 */
function selectBooster(type_booster) {
    const boosters = [
        {name: "NOTHING", dmg: 0},
        {name: "DMG_B01", dmg: 10},
        {name: "DMG_B01_DMG_B02", dmg: 20}
    ]
    return boosters.filter(subject => subject.name === type_booster)
        .map((e) => {
            return e.dmg;
    })
}

/**
 * @description Tato metoda bere dmg z formace.
 * @return number
 */
 function selectDroneFormation(droneFormation) {
    var formations = [
        {name: "NOTHING", dmg: 0},
        {name: "HEART", dmg: 5}, 
        {name: "RING", dmg: 25},
        {name: "DRILL", dmg: 20}
    ]

    return formations.filter(subject => subject.name === droneFormation)
        .map((e) => {
            return e.dmg
    })
}

/**
 * @description Tato metoda vybere danou munici kterou si hráč zvolí a aplikuje její dmg do výsledku. 
 * @returns number
 */
function selectAmmo(type_ammo) {
    var ammunitions = [
        {name: "NOTHING", dmg: 1},
        {name: "MB_25", dmg: 2}, 
        {name: "MCB_50", dmg: 3},
        {name: "UCB_100", dmg: 4},
        {name: "JOB_100", dmg: 3.5},
        {name: "RB_214", dmg: 8}
    ]

    return ammunitions.filter(subject => subject.name === type_ammo)
    .map((e) => {
        return e.dmg
    })
}

function applyUpgrades(upgrade, laserDmg) {
    var dmg = laserDmg
    if (upgrade === "YES") {
        dmg = percentage(laserDmg, 9.5)
    } else if (upgrade === "NO") {
        dmg = 0
    }
    return dmg
}

/**
 * @description Metoda pro výpočet procent
 * @return percentage
 */
 function percentage(num, amount){
    return num*amount / 100;
}

/**
 * @description Tato metoda vypočítá všechny podmínky a věci které jsou potřeba.
 * @return number
 */
function calculation_dmg(lasers_first_combination, lasers_second_combination, lasersShip, lasers_ship_2, shipDesigns, lasers_drones, droneDesign, resource, typeBooster, droneFormation, type_ammo, upgrade, type) {

    var selectedLasers_first =+ selectLaserDmg(lasers_first_combination) + applyUpgrades(upgrade, selectLaserDmg(lasers_first_combination))
    var selectedLasers_second =+ selectLaserDmg(lasers_second_combination) + applyUpgrades(upgrade, selectLaserDmg(lasers_second_combination))
    var dmg_from_ship =  (selectedLasers_first * lasersShip) + selectedLasers_second
    var dmg_from_drones = (selectedLasers_first * lasers_drones) + percentage(selectedLasers_first * lasers_drones, 10)
    var dmg_with_ammo = (dmg_from_ship + dmg_from_drones) * selectAmmo(type_ammo)
    var dmg_with_resources = dmg_with_ammo + percentage(dmg_with_ammo, selectResources(resource))
    var dmg_with_ship_desing = dmg_with_resources + percentage(dmg_with_resources, selectShipDesign(shipDesigns))
    var dmg_with_drone_design = dmg_with_ship_desing + percentage(dmg_with_ship_desing, selectDroneDesign(droneDesign))
    var dmg_with_formation = droneFormation ? dmg_with_drone_design : dmg_with_drone_design
    if (droneFormation === "RING") {
        dmg_with_formation = dmg_with_drone_design - percentage(dmg_with_drone_design, selectDroneFormation(droneFormation))
    } else if(droneFormation === "HEART") {
        dmg_with_formation = dmg_with_drone_design - percentage(dmg_with_drone_design, selectDroneFormation(droneFormation))
    } else if (droneFormation === "DRILL") {
        dmg_with_formation = dmg_with_drone_design + percentage(dmg_with_drone_design, selectDroneFormation(droneFormation))
    }
    var dmg_with_booster = dmg_with_formation + percentage(dmg_with_formation, selectBooster(typeBooster))
    var final_dmg = dmg_with_booster
    
    if (type === "STANDARD") {
        final_dmg = dmg_from_ship + dmg_from_drones
    } else if (type === "WITHOUT_RESOURCES") {
        final_dmg = dmg_with_ammo
    } else {
        final_dmg = dmg_with_booster
    }

    return parseInt(final_dmg)
}
// ============================================================
// CF Event - Carbon Footprint for Event Calculator
// ============================================================

// === DATA CONSTANTS ===
const EF = {
    lpg: 3.1134,
    foodNormal: 2.4432,
    foodVeg: 0.7496,
    electricity: 0.4999,
    carPetrol: 2.2327,
    pickupDiesel: 2.7406,
    taxiCNG: 2.2609,
    busDiesel: 2.7406,
    vanDiesel: 2.7406,
    motorcyclePetrol: 2.2327,
    btsPerTrip: 0.7102,
    walk: 0,
    bicycle: 0,
    flightDomestic: 0.1192,
    flightInternational: 0.0936,
    accommodation: 7.97,
    paper: 2.102,
    plastic: 2.6922,
    wastePaper: 2.93,
    wasteCloth: 2.00,
    wasteFood: 2.53,
    wasteWood: 3.33,
    wasteGarden: 3.27,
    wasteDiaper: 4.00,
    wasteRubber: 3.13,
    wasteOther: 2.32
};

const FUEL_EFFICIENCY = {
    carPetrol: 13.796,
    pickupDiesel: 11.111,
    taxiCNG: 11.905,
    busDiesel: 2.85,
    vanDiesel: 10.204,
    motorcyclePetrol: 38.655
};

const TRANSPORT_TYPES = [
    { id: 'carPetrol', name: 'รถยนต์ส่วนบุคคล', ef: EF.carPetrol, fe: FUEL_EFFICIENCY.carPetrol, fuelUnit: 'ลิตร', unit: 'km' },
    { id: 'pickupDiesel', name: 'รถกระบะส่วนบุคคล', ef: EF.pickupDiesel, fe: FUEL_EFFICIENCY.pickupDiesel, fuelUnit: 'ลิตร', unit: 'km' },
    { id: 'taxiCNG', name: 'แท็กซี่', ef: EF.taxiCNG, fe: FUEL_EFFICIENCY.taxiCNG, fuelUnit: 'ลิตร', unit: 'km' },
    { id: 'busDiesel', name: 'รถโดยสารประจำทาง', ef: EF.busDiesel, fe: FUEL_EFFICIENCY.busDiesel, fuelUnit: 'ลิตร', unit: 'km' },
    { id: 'vanDiesel', name: 'รถตู้ประจำทาง', ef: EF.vanDiesel, fe: FUEL_EFFICIENCY.vanDiesel, fuelUnit: 'ลิตร', unit: 'km' },
    { id: 'motorcyclePetrol', name: 'จักรยานยนต์', ef: EF.motorcyclePetrol, fe: FUEL_EFFICIENCY.motorcyclePetrol, fuelUnit: 'ลิตร', unit: 'km' },
    { id: 'bts', name: 'รถไฟฟ้า', ef: EF.btsPerTrip, fe: null, fuelUnit: null, unit: 'คน/เที่ยว' },
    { id: 'walk', name: 'เดิน', ef: 0, fe: null, fuelUnit: null, unit: 'km' },
    { id: 'bicycle', name: 'จักรยาน', ef: 0, fe: null, fuelUnit: null, unit: 'km' }
];

const WASTE_TYPES = [
    { id: 'wastePaper', name: 'กระดาษ / กระดาษกล่อง', ef: EF.wastePaper, icon: 'fa-newspaper' },
    { id: 'wasteCloth', name: 'ผ้า', ef: EF.wasteCloth, icon: 'fa-shirt' },
    { id: 'wasteFood', name: 'เศษอาหาร', ef: EF.wasteFood, icon: 'fa-drumstick-bite' },
    { id: 'wasteWood', name: 'เศษไม้', ef: EF.wasteWood, icon: 'fa-tree' },
    { id: 'wasteGarden', name: 'กิ่งไม้ ต้นหญ้า จากสวน', ef: EF.wasteGarden, icon: 'fa-seedling' },
    { id: 'wasteDiaper', name: 'ผ้าอ้อมเด็กทำด้วยกระดาษ', ef: EF.wasteDiaper, icon: 'fa-baby' },
    { id: 'wasteRubber', name: 'ยางและหนัง', ef: EF.wasteRubber, icon: 'fa-ring' },
    { id: 'wasteOther', name: 'อื่นๆ', ef: EF.wasteOther, icon: 'fa-box' }
];

const EF_REFERENCE = [
    { name: 'ก๊าซหุงต้ม (LPG)', ef: 3.1134, source: 'IPCC Vol.2 table 2.2, DEDE, AR5' },
    { name: 'อาหารปกติ', ef: 2.4432, source: 'นฤเทพ (2555)' },
    { name: 'อาหารมังสวิรัติ', ef: 0.7496, source: 'นฤเทพ (2555)' },
    { name: 'ไฟฟ้าจากงาน', ef: 0.4999, source: 'Thai National LCI Database, TIISMTEC-NSTDA, AR5' },
    { name: 'รถยนต์ส่วนตัว (เบนซิน)', ef: 2.2327, source: 'IPCC Vol.2 table 3.2.1, 3.2.2, DEDE, AR5' },
    { name: 'รถกระบะส่วนตัว (ดีเซล)', ef: 2.7406, source: 'IPCC Vol.2 table 3.2.1, 3.2.2, DEDE, AR5' },
    { name: 'แท็กซี่ (CNG)', ef: 2.2609, source: 'IPCC Vol.2 table 3.2.1, 3.2.2, PTT, AR5' },
    { name: 'รถโดยสารประจำทาง (ดีเซล)', ef: 2.7406, source: 'IPCC Vol.2 table 3.2.1, 3.2.2, DEDE, AR5' },
    { name: 'รถตู้ประจำทาง (ดีเซล)', ef: 2.7406, source: 'IPCC Vol.2 table 3.2.1, 3.2.2, DEDE, AR5' },
    { name: 'จักรยานยนต์ (เบนซิน)', ef: 2.2327, source: 'IPCC Vol.2 table 3.2.1, 3.2.2, DEDE, AR5' },
    { name: 'รถไฟฟ้า (คน/เที่ยว)', ef: 0.7102, source: 'สถาบันสิ่งแวดล้อมไทย (2555)' },
    { name: 'เที่ยวบินในประเทศ', ef: 0.1192, source: 'Defra, 2022' },
    { name: 'เที่ยวบินระหว่างประเทศ', ef: 0.0936, source: 'Defra, 2022' },
    { name: 'พักแรม (คน-คืน)', ef: 7.97, source: 'www.carbonzero.co.nz' },
    { name: 'กระดาษ (เอกสาร)', ef: 2.102, source: 'IPCC' },
    { name: 'พลาสติก (เอกสาร)', ef: 2.6922, source: 'IPCC' },
    { name: 'ขยะ - กระดาษ/กล่อง', ef: 2.93, source: 'IPCC' },
    { name: 'ขยะ - ผ้า', ef: 2.00, source: 'IPCC' },
    { name: 'ขยะ - เศษอาหาร', ef: 2.53, source: 'IPCC' },
    { name: 'ขยะ - เศษไม้', ef: 3.33, source: 'IPCC' },
    { name: 'ขยะ - กิ่งไม้/ต้นหญ้า', ef: 3.27, source: 'IPCC' },
    { name: 'ขยะ - ยาง/หนัง', ef: 3.13, source: 'IPCC' },
    { name: 'ขยะ - อื่นๆ', ef: 2.32, source: 'IPCC' }
];

const DISTANCES = [
    { id:1, from:'กรุงเทพ', to:'กระบี่', km:814 },
    { id:2, from:'กรุงเทพ', to:'กาญจนบุรี', km:128 },
    { id:3, from:'กรุงเทพ', to:'กาฬสินธุ์', km:519 },
    { id:4, from:'กรุงเทพ', to:'กำแพงเพชร', km:358 },
    { id:5, from:'กรุงเทพ', to:'ขอนแก่น', km:449 },
    { id:6, from:'กรุงเทพ', to:'จันทบุรี', km:245 },
    { id:7, from:'กรุงเทพ', to:'ฉะเชิงเทรา', km:82 },
    { id:8, from:'กรุงเทพ', to:'ชลบุรี', km:81 },
    { id:9, from:'กรุงเทพ', to:'ชัยนาท', km:194 },
    { id:10, from:'กรุงเทพ', to:'ชัยภูมิ', km:342 },
    { id:11, from:'กรุงเทพ', to:'ชุมพร', km:463 },
    { id:12, from:'กรุงเทพ', to:'เชียงราย', km:785 },
    { id:13, from:'กรุงเทพ', to:'เชียงใหม่', km:696 },
    { id:14, from:'กรุงเทพ', to:'ตรัง', km:828 },
    { id:15, from:'กรุงเทพ', to:'ตราด', km:315 },
    { id:16, from:'กรุงเทพ', to:'ตาก', km:426 },
    { id:17, from:'กรุงเทพ', to:'นครนายก', km:107 },
    { id:18, from:'กรุงเทพ', to:'นครปฐม', km:56 },
    { id:19, from:'กรุงเทพ', to:'นครพนม', km:740 },
    { id:20, from:'กรุงเทพ', to:'นครราชสีมา', km:259 },
    { id:21, from:'กรุงเทพ', to:'นครศรีธรรมราช', km:780 },
    { id:22, from:'กรุงเทพ', to:'นครสวรรค์', km:237 },
    { id:23, from:'กรุงเทพ', to:'นนทบุรี', km:20 },
    { id:24, from:'กรุงเทพ', to:'นราธิวาส', km:1149 },
    { id:25, from:'กรุงเทพ', to:'น่าน', km:668 },
    { id:26, from:'กรุงเทพ', to:'บุรีรัมย์', km:410 },
    { id:27, from:'กรุงเทพ', to:'ปทุมธานี', km:46 },
    { id:28, from:'กรุงเทพ', to:'ประจวบคีรีขันธ์', km:281 },
    { id:29, from:'กรุงเทพ', to:'ปราจีนบุรี', km:136 },
    { id:30, from:'กรุงเทพ', to:'ปัตตานี', km:1055 },
    { id:31, from:'กรุงเทพ', to:'พระนครศรีอยุธยา', km:76 },
    { id:32, from:'กรุงเทพ', to:'พะเยา', km:735 },
    { id:33, from:'กรุงเทพ', to:'พังงา', km:788 },
    { id:34, from:'กรุงเทพ', to:'พัทลุง', km:846 },
    { id:35, from:'กรุงเทพ', to:'พิจิตร', km:334 },
    { id:36, from:'กรุงเทพ', to:'พิษณุโลก', km:377 },
    { id:37, from:'กรุงเทพ', to:'เพชรบุรี', km:123 },
    { id:38, from:'กรุงเทพ', to:'เพชรบูรณ์', km:346 },
    { id:39, from:'กรุงเทพ', to:'แพร่', km:555 },
    { id:40, from:'กรุงเทพ', to:'ภูเก็ต', km:862 },
    { id:41, from:'กรุงเทพ', to:'มหาสารคาม', km:475 },
    { id:42, from:'กรุงเทพ', to:'มุกดาหาร', km:642 },
    { id:43, from:'กรุงเทพ', to:'แม่ฮ่องสอน', km:924 },
    { id:44, from:'กรุงเทพ', to:'ยโสธร', km:531 },
    { id:45, from:'กรุงเทพ', to:'ยะลา', km:1084 },
    { id:46, from:'กรุงเทพ', to:'ร้อยเอ็ด', km:512 },
    { id:47, from:'กรุงเทพ', to:'ระนอง', km:568 },
    { id:48, from:'กรุงเทพ', to:'ระยอง', km:179 },
    { id:49, from:'กรุงเทพ', to:'ราชบุรี', km:100 },
    { id:50, from:'กรุงเทพ', to:'ลพบุรี', km:155 },
    { id:51, from:'กรุงเทพ', to:'ลำปาง', km:602 },
    { id:52, from:'กรุงเทพ', to:'ลำพูน', km:670 },
    { id:53, from:'กรุงเทพ', to:'เลย', km:520 },
    { id:54, from:'กรุงเทพ', to:'ศรีสะเกษ', km:571 },
    { id:55, from:'กรุงเทพ', to:'สกลนคร', km:647 },
    { id:56, from:'กรุงเทพ', to:'สงขลา', km:950 },
    { id:57, from:'กรุงเทพ', to:'สตูล', km:973 },
    { id:58, from:'กรุงเทพ', to:'สมุทรปราการ', km:29 },
    { id:59, from:'กรุงเทพ', to:'สมุทรสงคราม', km:63 },
    { id:60, from:'กรุงเทพ', to:'สมุทรสาคร', km:36 },
    { id:61, from:'กรุงเทพ', to:'สระแก้ว', km:255 },
    { id:62, from:'กรุงเทพ', to:'สระบุรี', km:107 },
    { id:63, from:'กรุงเทพ', to:'สิงห์บุรี', km:142 },
    { id:64, from:'กรุงเทพ', to:'สุโขทัย', km:427 },
    { id:65, from:'กรุงเทพ', to:'สุพรรณบุรี', km:107 },
    { id:66, from:'กรุงเทพ', to:'สุราษฎร์ธานี', km:644 },
    { id:67, from:'กรุงเทพ', to:'สุรินทร์', km:457 },
    { id:68, from:'กรุงเทพ', to:'หนองคาย', km:615 },
    { id:69, from:'กรุงเทพ', to:'หนองบัวลำภู', km:518 },
    { id:70, from:'กรุงเทพ', to:'อ่างทอง', km:108 },
    { id:71, from:'กรุงเทพ', to:'อุดรธานี', km:564 },
    { id:72, from:'กรุงเทพ', to:'อุตรดิตถ์', km:491 },
    { id:73, from:'กรุงเทพ', to:'อุทัยธานี', km:305 },
    { id:74, from:'กรุงเทพ', to:'อุบลราชธานี', km:629 },
    { id:75, from:'กรุงเทพ', to:'อำนาจเจริญ', km:574 }
];

// === STATE ===
let state = loadState();
let scopeChart = null;
let activityChart = null;
let transportCounter = state.transportItems ? state.transportItems.length : 0;

function defaultState() {
    return {
        eventName: '',
        eventDate: '',
        eventAttendees: 0,
        lpgAmount: 0,
        elecKwh: 0,
        foodNormal: 0,
        foodVeg: 0,
        accomNights: 0,
        docPaper: 0,
        docPlastic: 0,
        flightDomestic: 0,
        flightInternational: 0,
        transportItems: [],
        waste: {},
        acItems: [],
        lightItems: []
    };
}

function loadState() {
    try {
        const saved = localStorage.getItem('cfEventState');
        return saved ? { ...defaultState(), ...JSON.parse(saved) } : defaultState();
    } catch { return defaultState(); }
}

function saveState() {
    localStorage.setItem('cfEventState', JSON.stringify(state));
    updateAll();
}

function resetAll() {
    if (!confirm('ต้องการรีเซ็ตข้อมูลทั้งหมดหรือไม่?')) return;
    localStorage.removeItem('cfEventState');
    state = defaultState();
    transportCounter = 0;
    restoreInputs();
    updateAll();
}

// === NAVIGATION ===
const pageTitles = {
    dashboard: ['แดชบอร์ด', 'ภาพรวม Carbon Footprint ของงานอีเวนต์'],
    cooking: ['การปรุงอาหาร', 'Scope 1 - ก๊าซหุงต้มที่ใช้ในการปรุงอาหาร'],
    electricity: ['พลังงานไฟฟ้า', 'Scope 2 - ไฟฟ้าที่ใช้ในงาน'],
    transport: ['การเดินทาง', 'Scope 3 - การเดินทางของผู้เข้าร่วมงาน'],
    accommodation: ['การพักแรม', 'Scope 3 - ที่พักของผู้เข้าร่วมงาน'],
    food: ['อาหาร', 'Scope 3 - อาหารที่เสิร์ฟในงาน'],
    documents: ['เอกสารแจก', 'Scope 3 - เอกสาร สิ่งพิมพ์ และบรรจุภัณฑ์'],
    waste: ['ของเสีย', 'Scope 3 - ของเสียหลังการจัดงาน'],
    'ef-reference': ['ค่า EF อ้างอิง', 'แหล่งที่มาของค่า Emission Factor'],
    distance: ['ระยะทาง', 'ระยะทางจากกรุงเทพไปต่างจังหวัด'],
    report: ['รายงานสรุป', 'สรุปผลการคำนวณ Carbon Footprint']
};

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = link.dataset.page;
        navigateTo(page);
        // Close mobile sidebar
        document.getElementById('sidebar').classList.remove('open');
    });
});

document.getElementById('menuBtn').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
});

function navigateTo(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

    const pageEl = document.getElementById('page-' + page);
    const navEl = document.querySelector(`[data-page="${page}"]`);
    if (pageEl) pageEl.classList.add('active');
    if (navEl) navEl.classList.add('active');

    const titles = pageTitles[page] || ['', ''];
    document.getElementById('pageTitle').textContent = titles[0];
    document.getElementById('pageSubtitle').textContent = titles[1];

    if (page === 'dashboard') updateCharts();
    if (page === 'report') updateReport();
}

// === CALCULATION FUNCTIONS ===
function calcCooking() {
    state.lpgAmount = parseFloat(document.getElementById('lpgAmount').value) || 0;
    const result = state.lpgAmount * EF.lpg;
    document.getElementById('cookingResult').textContent = result.toFixed(2);
    saveState();
}

function calcElectricity() {
    state.elecKwh = parseFloat(document.getElementById('elecKwh').value) || 0;
    const result = state.elecKwh * EF.electricity;
    document.getElementById('elecResult').textContent = result.toFixed(2);
    saveState();
}

function calcFood() {
    state.foodNormal = parseFloat(document.getElementById('foodNormal').value) || 0;
    state.foodVeg = parseFloat(document.getElementById('foodVeg').value) || 0;
    const normalCF = state.foodNormal * EF.foodNormal;
    const vegCF = state.foodVeg * EF.foodVeg;
    const total = normalCF + vegCF;
    document.getElementById('foodResult').textContent = total.toFixed(2);
    document.getElementById('foodBreakdown').textContent =
        `ปกติ: ${normalCF.toFixed(2)} + มังสวิรัติ: ${vegCF.toFixed(2)}`;
    saveState();
}

function calcAccommodation() {
    state.accomNights = parseFloat(document.getElementById('accomNights').value) || 0;
    const result = state.accomNights * EF.accommodation;
    document.getElementById('accomResult').textContent = result.toFixed(2);
    saveState();
}

function calcDocuments() {
    state.docPaper = parseFloat(document.getElementById('docPaper').value) || 0;
    state.docPlastic = parseFloat(document.getElementById('docPlastic').value) || 0;
    const result = state.docPaper * EF.paper + state.docPlastic * EF.plastic;
    document.getElementById('docResult').textContent = result.toFixed(2);
    saveState();
}

function calcWaste() {
    state.waste = {};
    let total = 0;
    WASTE_TYPES.forEach(w => {
        const val = parseFloat(document.getElementById('waste_' + w.id)?.value) || 0;
        state.waste[w.id] = val;
        total += val * w.ef;
    });
    document.getElementById('wasteResult').textContent = total.toFixed(2);
    saveState();
}

// === TRANSPORT ===
function addTransportItem(data) {
    transportCounter++;
    const id = transportCounter;
    const item = data || { id, type: 'carPetrol', persons: 1, distance: 0 };
    if (!data) {
        state.transportItems.push(item);
    }

    const div = document.createElement('div');
    div.id = 'transport_' + id;
    div.className = 'border rounded-xl p-4 bg-gray-50';
    div.innerHTML = `
        <div class="flex justify-between items-start mb-3">
            <span class="text-sm font-semibold text-gray-700">รายการ #${id}</span>
            <button onclick="removeTransportItem(${id})" class="text-red-400 hover:text-red-600 text-sm"><i class="fas fa-times"></i></button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div>
                <label class="block text-xs text-gray-500 mb-1">ประเภทยานพาหนะ</label>
                <select id="tType_${id}" class="w-full border rounded-lg px-3 py-2 text-sm" onchange="calcTransport()">
                    ${TRANSPORT_TYPES.map(t => `<option value="${t.id}" ${item.type === t.id ? 'selected' : ''}>${t.name}</option>`).join('')}
                </select>
            </div>
            <div>
                <label class="block text-xs text-gray-500 mb-1">จำนวนคน</label>
                <input type="number" id="tPersons_${id}" class="w-full border rounded-lg px-3 py-2 text-sm" value="${item.persons}" min="1" oninput="calcTransport()">
            </div>
            <div>
                <label class="block text-xs text-gray-500 mb-1">ระยะทาง (km) / จำนวนเที่ยว</label>
                <input type="number" id="tDist_${id}" class="w-full border rounded-lg px-3 py-2 text-sm" value="${item.distance}" min="0" step="0.1" oninput="calcTransport()">
            </div>
            <div>
                <label class="block text-xs text-gray-500 mb-1">ผลลัพธ์ (kgCO2e)</label>
                <div id="tResult_${id}" class="text-lg font-bold text-pink-700 py-1">0.00</div>
            </div>
        </div>
    `;
    document.getElementById('transportItems').appendChild(div);
    calcTransport();
}

function removeTransportItem(id) {
    state.transportItems = state.transportItems.filter(t => t.id !== id);
    const el = document.getElementById('transport_' + id);
    if (el) el.remove();
    calcTransport();
    saveState();
}

function calcTransport() {
    let totalTransport = 0;
    const breakdown = [];

    state.transportItems.forEach(item => {
        const typeEl = document.getElementById('tType_' + item.id);
        const personsEl = document.getElementById('tPersons_' + item.id);
        const distEl = document.getElementById('tDist_' + item.id);
        if (!typeEl) return;

        item.type = typeEl.value;
        item.persons = parseFloat(personsEl.value) || 0;
        item.distance = parseFloat(distEl.value) || 0;

        const tType = TRANSPORT_TYPES.find(t => t.id === item.type);
        let cf = 0;

        if (tType.id === 'bts') {
            cf = item.persons * item.distance * tType.ef;
        } else if (tType.id === 'walk' || tType.id === 'bicycle') {
            cf = 0;
        } else if (tType.fe) {
            const fuelUsed = item.distance / tType.fe;
            cf = fuelUsed * tType.ef * item.persons;
        }

        const resultEl = document.getElementById('tResult_' + item.id);
        if (resultEl) resultEl.textContent = cf.toFixed(2);
        totalTransport += cf;
    });

    // Flights
    state.flightDomestic = parseFloat(document.getElementById('flightDomestic')?.value) || 0;
    state.flightInternational = parseFloat(document.getElementById('flightInternational')?.value) || 0;
    const flightDomCF = state.flightDomestic * EF.flightDomestic;
    const flightIntCF = state.flightInternational * EF.flightInternational;
    totalTransport += flightDomCF + flightIntCF;

    if (flightDomCF > 0) breakdown.push(`ในประเทศ: ${flightDomCF.toFixed(2)}`);
    if (flightIntCF > 0) breakdown.push(`ระหว่างประเทศ: ${flightIntCF.toFixed(2)}`);

    document.getElementById('transportResult').textContent = totalTransport.toFixed(2);
    document.getElementById('transportBreakdown').textContent = breakdown.join(' | ');
    saveState();
}

// === ELECTRICITY EQUIPMENT CALCULATOR ===
function switchElecTab(tab) {
    const direct = document.getElementById('elecDirect');
    const calc = document.getElementById('elecCalc');
    const tabDirect = document.getElementById('elecTabDirect');
    const tabCalc = document.getElementById('elecTabCalc');

    if (tab === 'direct') {
        direct.classList.remove('hidden');
        calc.classList.add('hidden');
        tabDirect.classList.add('bg-white', 'shadow-sm', 'text-primary-700');
        tabDirect.classList.remove('text-gray-500');
        tabCalc.classList.remove('bg-white', 'shadow-sm', 'text-primary-700');
        tabCalc.classList.add('text-gray-500');
    } else {
        direct.classList.add('hidden');
        calc.classList.remove('hidden');
        tabCalc.classList.add('bg-white', 'shadow-sm', 'text-primary-700');
        tabCalc.classList.remove('text-gray-500');
        tabDirect.classList.remove('bg-white', 'shadow-sm', 'text-primary-700');
        tabDirect.classList.add('text-gray-500');
    }
}

const AC_TYPES = [
    { name: 'Split Type - 9,000 BTU', kwPerHr: 2.637639 },
    { name: 'Split Type - 12,000 BTU', kwPerHr: 3.516852 },
    { name: 'Split Type - 18,000 BTU', kwPerHr: 5.275278 },
    { name: 'Package (อากาศ) - 30 ตัน', kwPerHr: 48.0 },
    { name: 'Package (น้ำ) - 15 ตัน', kwPerHr: 18.0 },
    { name: 'Chiller (อากาศ) - 300 ตัน', kwPerHr: 480.0 },
    { name: 'Chiller (น้ำ) - 150 ตัน', kwPerHr: 112.5 }
];

const LIGHT_TYPES = [
    { name: 'หลอดกลม (32W)', watt: 32 },
    { name: 'หลอดฟลูออเรสเซนต์ (18W)', watt: 18 },
    { name: 'หลอดคอมแพคฟลูออเรสเซนต์ (22W)', watt: 22 },
    { name: 'หลอดฮาโลเจน (50W)', watt: 50 },
    { name: 'หลอด HID (35W)', watt: 35 },
    { name: 'หลอดไฮบริดฮาโลเจน (25W)', watt: 25 },
    { name: 'หลอดไฟ LED (9.5W)', watt: 9.5 },
    { name: 'อื่นๆ (10.5W)', watt: 10.5 }
];

let acCounter = 0;
let lightCounter = 0;

function addAcItem(data) {
    acCounter++;
    const id = acCounter;
    const item = data || { id, type: 0, qty: 1, hours: 8 };
    if (!data) state.acItems.push(item);

    const div = document.createElement('div');
    div.id = 'ac_' + id;
    div.className = 'grid grid-cols-4 gap-2 mb-2 items-end';
    div.innerHTML = `
        <div>
            <select id="acType_${id}" class="w-full border rounded-lg px-2 py-1.5 text-xs" onchange="calcEquipment()">
                ${AC_TYPES.map((t, i) => `<option value="${i}" ${item.type == i ? 'selected' : ''}>${t.name}</option>`).join('')}
            </select>
        </div>
        <div>
            <input type="number" id="acQty_${id}" class="w-full border rounded-lg px-2 py-1.5 text-xs" placeholder="จำนวน" value="${item.qty}" min="1" oninput="calcEquipment()">
        </div>
        <div>
            <input type="number" id="acHrs_${id}" class="w-full border rounded-lg px-2 py-1.5 text-xs" placeholder="ชม." value="${item.hours}" min="0" oninput="calcEquipment()">
        </div>
        <div class="flex items-center gap-2">
            <span id="acRes_${id}" class="text-xs font-semibold text-blue-700">0 kWh</span>
            <button onclick="removeAcItem(${id})" class="text-red-400 hover:text-red-600"><i class="fas fa-times text-xs"></i></button>
        </div>
    `;
    document.getElementById('acItems').appendChild(div);
    calcEquipment();
}

function removeAcItem(id) {
    state.acItems = state.acItems.filter(a => a.id !== id);
    document.getElementById('ac_' + id)?.remove();
    calcEquipment();
}

function addLightItem(data) {
    lightCounter++;
    const id = lightCounter;
    const item = data || { id, type: 0, qty: 100, hours: 8 };
    if (!data) state.lightItems.push(item);

    const div = document.createElement('div');
    div.id = 'light_' + id;
    div.className = 'grid grid-cols-4 gap-2 mb-2 items-end';
    div.innerHTML = `
        <div>
            <select id="lightType_${id}" class="w-full border rounded-lg px-2 py-1.5 text-xs" onchange="calcEquipment()">
                ${LIGHT_TYPES.map((t, i) => `<option value="${i}" ${item.type == i ? 'selected' : ''}>${t.name}</option>`).join('')}
            </select>
        </div>
        <div>
            <input type="number" id="lightQty_${id}" class="w-full border rounded-lg px-2 py-1.5 text-xs" placeholder="จำนวนหลอด" value="${item.qty}" min="1" oninput="calcEquipment()">
        </div>
        <div>
            <input type="number" id="lightHrs_${id}" class="w-full border rounded-lg px-2 py-1.5 text-xs" placeholder="ชม." value="${item.hours}" min="0" oninput="calcEquipment()">
        </div>
        <div class="flex items-center gap-2">
            <span id="lightRes_${id}" class="text-xs font-semibold text-blue-700">0 kWh</span>
            <button onclick="removeLightItem(${id})" class="text-red-400 hover:text-red-600"><i class="fas fa-times text-xs"></i></button>
        </div>
    `;
    document.getElementById('lightItems').appendChild(div);
    calcEquipment();
}

function removeLightItem(id) {
    state.lightItems = state.lightItems.filter(l => l.id !== id);
    document.getElementById('light_' + id)?.remove();
    calcEquipment();
}

function calcEquipment() {
    let totalKwh = 0;

    state.acItems.forEach(item => {
        const typeEl = document.getElementById('acType_' + item.id);
        const qtyEl = document.getElementById('acQty_' + item.id);
        const hrsEl = document.getElementById('acHrs_' + item.id);
        if (!typeEl) return;
        item.type = parseInt(typeEl.value);
        item.qty = parseInt(qtyEl.value) || 0;
        item.hours = parseFloat(hrsEl.value) || 0;
        const kwh = AC_TYPES[item.type].kwPerHr * item.qty * item.hours;
        totalKwh += kwh;
        const resEl = document.getElementById('acRes_' + item.id);
        if (resEl) resEl.textContent = kwh.toFixed(2) + ' kWh';
    });

    state.lightItems.forEach(item => {
        const typeEl = document.getElementById('lightType_' + item.id);
        const qtyEl = document.getElementById('lightQty_' + item.id);
        const hrsEl = document.getElementById('lightHrs_' + item.id);
        if (!typeEl) return;
        item.type = parseInt(typeEl.value);
        item.qty = parseInt(qtyEl.value) || 0;
        item.hours = parseFloat(hrsEl.value) || 0;
        const kwh = (LIGHT_TYPES[item.type].watt * item.qty * item.hours) / 1000;
        totalKwh += kwh;
        const resEl = document.getElementById('lightRes_' + item.id);
        if (resEl) resEl.textContent = kwh.toFixed(2) + ' kWh';
    });

    document.getElementById('elecCalcKwh').textContent = totalKwh.toFixed(2) + ' kWh';
    document.getElementById('elecCalcResult').textContent = (totalKwh * EF.electricity).toFixed(2);
}

function applyEquipmentCalc() {
    let totalKwh = 0;
    state.acItems.forEach(item => {
        totalKwh += AC_TYPES[item.type].kwPerHr * item.qty * item.hours;
    });
    state.lightItems.forEach(item => {
        totalKwh += (LIGHT_TYPES[item.type].watt * item.qty * item.hours) / 1000;
    });
    document.getElementById('elecKwh').value = totalKwh.toFixed(2);
    state.elecKwh = totalKwh;
    document.getElementById('elecResult').textContent = (totalKwh * EF.electricity).toFixed(2);
    switchElecTab('direct');
    saveState();
}

// === SCOPE CALCULATIONS ===
function getScope1() {
    return state.lpgAmount * EF.lpg;
}

function getScope2() {
    return state.elecKwh * EF.electricity;
}

function getScope3() {
    let total = 0;
    // Transport
    state.transportItems.forEach(item => {
        const tType = TRANSPORT_TYPES.find(t => t.id === item.type);
        if (!tType) return;
        if (tType.id === 'bts') total += item.persons * item.distance * tType.ef;
        else if (tType.id !== 'walk' && tType.id !== 'bicycle' && tType.fe) {
            total += (item.distance / tType.fe) * tType.ef * item.persons;
        }
    });
    // Flights
    total += state.flightDomestic * EF.flightDomestic;
    total += state.flightInternational * EF.flightInternational;
    // Food
    total += state.foodNormal * EF.foodNormal;
    total += state.foodVeg * EF.foodVeg;
    // Accommodation
    total += state.accomNights * EF.accommodation;
    // Documents
    total += state.docPaper * EF.paper;
    total += state.docPlastic * EF.plastic;
    // Waste
    WASTE_TYPES.forEach(w => {
        total += (state.waste[w.id] || 0) * w.ef;
    });
    return total;
}

function getActivityBreakdown() {
    const activities = [];
    const s1 = getScope1();
    if (s1 > 0) activities.push({ name: 'การปรุงอาหาร (LPG)', scope: 1, value: s1, page: 'cooking' });

    const s2 = getScope2();
    if (s2 > 0) activities.push({ name: 'พลังงานไฟฟ้า', scope: 2, value: s2, page: 'electricity' });

    // Transport
    let transportTotal = 0;
    state.transportItems.forEach(item => {
        const tType = TRANSPORT_TYPES.find(t => t.id === item.type);
        if (!tType) return;
        let cf = 0;
        if (tType.id === 'bts') cf = item.persons * item.distance * tType.ef;
        else if (tType.id !== 'walk' && tType.id !== 'bicycle' && tType.fe) {
            cf = (item.distance / tType.fe) * tType.ef * item.persons;
        }
        transportTotal += cf;
    });
    const flightDom = state.flightDomestic * EF.flightDomestic;
    const flightInt = state.flightInternational * EF.flightInternational;
    transportTotal += flightDom + flightInt;
    if (transportTotal > 0) activities.push({ name: 'การเดินทาง', scope: 3, value: transportTotal, page: 'transport' });

    const foodTotal = state.foodNormal * EF.foodNormal + state.foodVeg * EF.foodVeg;
    if (foodTotal > 0) activities.push({ name: 'อาหาร', scope: 3, value: foodTotal, page: 'food' });

    const accom = state.accomNights * EF.accommodation;
    if (accom > 0) activities.push({ name: 'การพักแรม', scope: 3, value: accom, page: 'accommodation' });

    const docs = state.docPaper * EF.paper + state.docPlastic * EF.plastic;
    if (docs > 0) activities.push({ name: 'เอกสารแจก', scope: 3, value: docs, page: 'documents' });

    let wasteTotal = 0;
    WASTE_TYPES.forEach(w => wasteTotal += (state.waste[w.id] || 0) * w.ef);
    if (wasteTotal > 0) activities.push({ name: 'ของเสีย', scope: 3, value: wasteTotal, page: 'waste' });

    return activities;
}

// === UPDATE UI ===
function updateAll() {
    const s1 = getScope1();
    const s2 = getScope2();
    const s3 = getScope3();
    const total = s1 + s2 + s3;

    document.getElementById('scope1Total').textContent = s1.toFixed(2);
    document.getElementById('scope2Total').textContent = s2.toFixed(2);
    document.getElementById('scope3Total').textContent = s3.toFixed(2);
    document.getElementById('totalKg').textContent = total.toFixed(2);
    document.getElementById('totalTon').textContent = (total / 1000).toFixed(4) + ' tCO2e';
    document.getElementById('totalDisplay').textContent = (total / 1000).toFixed(4) + ' tCO2e';

    const pct = (v) => total > 0 ? ((v / total) * 100).toFixed(1) + '% ของทั้งหมด' : '0% ของทั้งหมด';
    document.getElementById('scope1Pct').textContent = pct(s1);
    document.getElementById('scope2Pct').textContent = pct(s2);
    document.getElementById('scope3Pct').textContent = pct(s3);

    updateActivityTable();
    updateCharts();
}

function updateActivityTable() {
    const activities = getActivityBreakdown();
    const total = activities.reduce((sum, a) => sum + a.value, 0);
    const tbody = document.getElementById('activityTable');
    if (!tbody) return;

    const scopeBadge = (s) => {
        const cls = s === 1 ? 'scope-badge-1' : s === 2 ? 'scope-badge-2' : 'scope-badge-3';
        return `<span class="${cls} text-xs px-2 py-1 rounded-full font-medium">Scope ${s}</span>`;
    };

    tbody.innerHTML = activities.length === 0
        ? '<tr><td colspan="5" class="py-8 text-center text-gray-400">ยังไม่มีข้อมูล กรุณากรอกข้อมูลในแต่ละหมวด</td></tr>'
        : activities.map(a => `
            <tr class="border-b hover:bg-gray-50 cursor-pointer" onclick="navigateTo('${a.page}')">
                <td class="py-3 px-4 font-medium text-gray-800">${a.name}</td>
                <td class="py-3 px-4">${scopeBadge(a.scope)}</td>
                <td class="py-3 px-4 text-right font-semibold">${a.value.toFixed(2)}</td>
                <td class="py-3 px-4 text-right">${total > 0 ? ((a.value / total) * 100).toFixed(1) : 0}%</td>
                <td class="py-3 px-4"><span class="text-green-600 text-xs"><i class="fas fa-check-circle"></i> กรอกแล้ว</span></td>
            </tr>
        `).join('');
}

// === CHARTS ===
function updateCharts() {
    const s1 = getScope1();
    const s2 = getScope2();
    const s3 = getScope3();

    // Scope Pie Chart
    const scopeCtx = document.getElementById('scopeChart');
    if (!scopeCtx) return;

    if (scopeChart) scopeChart.destroy();
    scopeChart = new Chart(scopeCtx, {
        type: 'doughnut',
        data: {
            labels: ['Scope 1 - การเผาไหม้', 'Scope 2 - ไฟฟ้า', 'Scope 3 - ทางอ้อม'],
            datasets: [{
                data: [s1, s2, s3],
                backgroundColor: ['#f59e0b', '#3b82f6', '#ec4899'],
                borderWidth: 0,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom', labels: { padding: 20, font: { family: 'Noto Sans Thai', size: 12 } } }
            },
            cutout: '65%'
        }
    });

    // Activity Bar Chart
    const activities = getActivityBreakdown();
    const actCtx = document.getElementById('activityChart');
    if (!actCtx) return;

    if (activityChart) activityChart.destroy();
    activityChart = new Chart(actCtx, {
        type: 'bar',
        data: {
            labels: activities.map(a => a.name),
            datasets: [{
                label: 'kgCO2e',
                data: activities.map(a => a.value),
                backgroundColor: activities.map(a =>
                    a.scope === 1 ? '#f59e0b' : a.scope === 2 ? '#3b82f6' : '#ec4899'
                ),
                borderRadius: 6,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: { grid: { display: false }, ticks: { font: { family: 'Noto Sans Thai' } } },
                y: { grid: { display: false }, ticks: { font: { family: 'Noto Sans Thai', size: 11 } } }
            }
        }
    });
}

// === EF REFERENCE TABLE ===
function renderEfTable() {
    const tbody = document.getElementById('efTable');
    tbody.innerHTML = EF_REFERENCE.map((r, i) => `
        <tr class="${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b">
            <td class="py-3 px-4 font-medium">${r.name}</td>
            <td class="py-3 px-4 text-right font-semibold text-primary-700">${r.ef}</td>
            <td class="py-3 px-4 text-sm text-gray-500">${r.source}</td>
        </tr>
    `).join('');
}

// === DISTANCE TABLE ===
function renderDistTable(filter = '') {
    const tbody = document.getElementById('distTable');
    const filtered = filter
        ? DISTANCES.filter(d => d.to.includes(filter) || d.from.includes(filter))
        : DISTANCES;
    tbody.innerHTML = filtered.map(d => `
        <tr class="border-b hover:bg-green-50">
            <td class="py-2 px-4 text-gray-500">${d.id}</td>
            <td class="py-2 px-4">${d.from}</td>
            <td class="py-2 px-4 font-medium">${d.to}</td>
            <td class="py-2 px-4 text-right font-semibold">${d.km}</td>
            <td class="py-2 px-4 text-center">
                <button onclick="useDistance(${d.km}, '${d.to}')" class="text-xs bg-primary-100 text-primary-700 px-3 py-1 rounded-full hover:bg-primary-200 transition">
                    <i class="fas fa-plus mr-1"></i>ใช้
                </button>
            </td>
        </tr>
    `).join('');
}

function filterDistance() {
    const q = document.getElementById('distSearch').value;
    renderDistTable(q);
}

function useDistance(km, destination) {
    navigateTo('transport');
    const newItem = { id: ++transportCounter, type: 'carPetrol', persons: 1, distance: km };
    state.transportItems.push(newItem);
    addTransportItem(newItem);
    saveState();
    alert(`เพิ่มระยะทาง ${km} km (${destination}) เรียบร้อย`);
}

// === WASTE INPUTS ===
function renderWasteInputs() {
    const container = document.getElementById('wasteInputs');
    container.innerHTML = WASTE_TYPES.map(w => `
        <div class="bg-gray-50 rounded-xl p-4">
            <div class="flex items-center gap-2 mb-2">
                <i class="fas ${w.icon} text-red-400"></i>
                <span class="text-sm font-medium text-gray-700">${w.name}</span>
            </div>
            <input type="number" id="waste_${w.id}" class="w-full border rounded-lg px-3 py-2 text-sm" placeholder="0 kg" min="0" step="0.1" value="${state.waste[w.id] || ''}" oninput="calcWaste()">
            <p class="text-xs text-gray-400 mt-1">EF = ${w.ef} kgCO2e/kg</p>
        </div>
    `).join('');
}

// === REPORT ===
function updateReport() {
    const s1 = getScope1();
    const s2 = getScope2();
    const s3 = getScope3();
    const total = s1 + s2 + s3;
    const pct = (v) => total > 0 ? ((v / total) * 100).toFixed(1) + '%' : '0%';

    document.getElementById('reportEventName').textContent = state.eventName || 'ยังไม่ระบุชื่องาน';
    document.getElementById('reportEventDate').textContent = state.eventDate ? `วันที่จัดงาน: ${state.eventDate}` : '';

    document.getElementById('rptScope1').textContent = s1.toFixed(2);
    document.getElementById('rptScope2').textContent = s2.toFixed(2);
    document.getElementById('rptScope3').textContent = s3.toFixed(2);
    document.getElementById('rptScope1Pct').textContent = pct(s1);
    document.getElementById('rptScope2Pct').textContent = pct(s2);
    document.getElementById('rptScope3Pct').textContent = pct(s3);
    document.getElementById('rptTotal').textContent = total.toFixed(2);
    document.getElementById('rptTotalTon').textContent = (total / 1000).toFixed(4);

    const attendees = state.eventAttendees || 0;
    document.getElementById('rptPerCapita').textContent = attendees > 0
        ? (total / attendees).toFixed(2) + ' kgCO2e/คน'
        : '- (กรุณาระบุจำนวนผู้เข้าร่วม)';

    // Build detail table
    const rows = [];
    const addRow = (scope, main, sub, qty, unit, ef, cf) => {
        if (cf > 0) rows.push({ scope, main, sub, qty, unit, ef, cf });
    };

    addRow(1, 'การปรุงอาหาร', 'ก๊าซหุงต้ม', state.lpgAmount, 'kg', EF.lpg, state.lpgAmount * EF.lpg);
    addRow(2, 'พลังงานไฟฟ้า', 'ไฟฟ้าจากงาน', state.elecKwh, 'kWh', EF.electricity, state.elecKwh * EF.electricity);

    state.transportItems.forEach(item => {
        const tType = TRANSPORT_TYPES.find(t => t.id === item.type);
        if (!tType) return;
        let cf = 0;
        if (tType.id === 'bts') cf = item.persons * item.distance * tType.ef;
        else if (tType.id !== 'walk' && tType.id !== 'bicycle' && tType.fe) {
            cf = (item.distance / tType.fe) * tType.ef * item.persons;
        }
        addRow(3, 'การเดินทาง', `${tType.name} (${item.persons} คน)`, item.distance, tType.unit, tType.ef, cf);
    });
    addRow(3, 'การเดินทาง', 'เที่ยวบินในประเทศ', state.flightDomestic, 'pkm', EF.flightDomestic, state.flightDomestic * EF.flightDomestic);
    addRow(3, 'การเดินทาง', 'เที่ยวบินระหว่างประเทศ', state.flightInternational, 'pkm', EF.flightInternational, state.flightInternational * EF.flightInternational);
    addRow(3, 'อาหาร', 'อาหารปกติ', state.foodNormal, 'คน', EF.foodNormal, state.foodNormal * EF.foodNormal);
    addRow(3, 'อาหาร', 'อาหารมังสวิรัติ', state.foodVeg, 'คน', EF.foodVeg, state.foodVeg * EF.foodVeg);
    addRow(3, 'การพักแรม', 'จำนวนผู้พักแรม', state.accomNights, 'คน-คืน', EF.accommodation, state.accomNights * EF.accommodation);
    addRow(3, 'เอกสารแจก', 'กระดาษ', state.docPaper, 'kg', EF.paper, state.docPaper * EF.paper);
    addRow(3, 'เอกสารแจก', 'พลาสติก', state.docPlastic, 'kg', EF.plastic, state.docPlastic * EF.plastic);
    WASTE_TYPES.forEach(w => {
        const val = state.waste[w.id] || 0;
        addRow(3, 'ของเสีย', w.name, val, 'kg', w.ef, val * w.ef);
    });

    const tbody = document.getElementById('reportTable');
    tbody.innerHTML = rows.length === 0
        ? '<tr><td colspan="7" class="py-6 text-center text-gray-400">ยังไม่มีข้อมูล</td></tr>'
        : rows.map((r, i) => `
            <tr class="${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b">
                <td class="py-2 px-4">${r.scope}</td>
                <td class="py-2 px-4">${r.main}</td>
                <td class="py-2 px-4">${r.sub}</td>
                <td class="py-2 px-4 text-right">${typeof r.qty === 'number' ? r.qty.toFixed(2) : r.qty}</td>
                <td class="py-2 px-4">${r.unit}</td>
                <td class="py-2 px-4 text-right">${r.ef}</td>
                <td class="py-2 px-4 text-right font-semibold">${r.cf.toFixed(2)}</td>
            </tr>
        `).join('');
}

// === EXPORT ===
function exportCSV() {
    updateReport();
    const s1 = getScope1(), s2 = getScope2(), s3 = getScope3();
    const total = s1 + s2 + s3;

    let csv = '\uFEFF'; // BOM for Thai
    csv += 'Carbon Footprint Report\n';
    csv += `ชื่องาน,${state.eventName}\n`;
    csv += `วันที่,${state.eventDate}\n`;
    csv += `ผู้เข้าร่วม,${state.eventAttendees}\n\n`;
    csv += 'Scope,รายการหลัก,รายการย่อย,ปริมาณ,หน่วย,EF,CF (kgCO2e)\n';

    const rows = document.querySelectorAll('#reportTable tr');
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length > 0) {
            const vals = Array.from(cells).map(c => `"${c.textContent.trim()}"`);
            csv += vals.join(',') + '\n';
        }
    });

    csv += `\nScope 1,,,,,,${s1.toFixed(2)}\n`;
    csv += `Scope 2,,,,,,${s2.toFixed(2)}\n`;
    csv += `Scope 3,,,,,,${s3.toFixed(2)}\n`;
    csv += `รวม (kgCO2e),,,,,,${total.toFixed(2)}\n`;
    csv += `รวม (tCO2e),,,,,,${(total / 1000).toFixed(4)}\n`;

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `CF_Event_Report_${state.eventName || 'export'}.csv`;
    link.click();
}

function printReport() {
    updateReport();
    const content = document.getElementById('reportContent').innerHTML;
    const win = window.open('', '_blank');
    win.document.write(`
        <html><head><title>CF Event Report</title>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <style>
            body { font-family: 'Noto Sans Thai', sans-serif; padding: 40px; max-width: 900px; margin: auto; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th, td { border: 1px solid #ddd; padding: 8px 12px; text-align: left; font-size: 13px; }
            th { background: #16a34a; color: white; }
            .text-right { text-align: right; }
            .text-center { text-align: center; }
            .font-bold, .font-semibold { font-weight: bold; }
            .text-2xl { font-size: 1.5em; }
            .text-xl { font-size: 1.2em; }
            .grid { display: flex; gap: 16px; flex-wrap: wrap; }
            .grid > div { flex: 1; min-width: 200px; border: 2px solid #ddd; border-radius: 8px; padding: 16px; text-align: center; }
            @media print { body { padding: 20px; } }
        </style></head><body>${content}</body></html>
    `);
    win.document.close();
    setTimeout(() => win.print(), 500);
}

// === SAVE EVENT INFO ===
function saveEventInfo() {
    state.eventName = document.getElementById('eventName').value;
    state.eventDate = document.getElementById('eventDate').value;
    state.eventAttendees = parseInt(document.getElementById('eventAttendees').value) || 0;
    saveState();
}

// === RESTORE INPUTS FROM STATE ===
function restoreInputs() {
    document.getElementById('eventName').value = state.eventName || '';
    document.getElementById('eventDate').value = state.eventDate || '';
    document.getElementById('eventAttendees').value = state.eventAttendees || '';
    document.getElementById('lpgAmount').value = state.lpgAmount || '';
    document.getElementById('elecKwh').value = state.elecKwh || '';
    document.getElementById('foodNormal').value = state.foodNormal || '';
    document.getElementById('foodVeg').value = state.foodVeg || '';
    document.getElementById('accomNights').value = state.accomNights || '';
    document.getElementById('docPaper').value = state.docPaper || '';
    document.getElementById('docPlastic').value = state.docPlastic || '';
    document.getElementById('flightDomestic').value = state.flightDomestic || '';
    document.getElementById('flightInternational').value = state.flightInternational || '';

    // Update display values
    if (state.lpgAmount) document.getElementById('cookingResult').textContent = (state.lpgAmount * EF.lpg).toFixed(2);
    if (state.elecKwh) document.getElementById('elecResult').textContent = (state.elecKwh * EF.electricity).toFixed(2);
    if (state.foodNormal || state.foodVeg) {
        const nCF = (state.foodNormal || 0) * EF.foodNormal;
        const vCF = (state.foodVeg || 0) * EF.foodVeg;
        document.getElementById('foodResult').textContent = (nCF + vCF).toFixed(2);
        document.getElementById('foodBreakdown').textContent = `ปกติ: ${nCF.toFixed(2)} + มังสวิรัติ: ${vCF.toFixed(2)}`;
    }
    if (state.accomNights) document.getElementById('accomResult').textContent = (state.accomNights * EF.accommodation).toFixed(2);
    if (state.docPaper || state.docPlastic) {
        document.getElementById('docResult').textContent = ((state.docPaper || 0) * EF.paper + (state.docPlastic || 0) * EF.plastic).toFixed(2);
    }

    // Restore transport items
    document.getElementById('transportItems').innerHTML = '';
    state.transportItems.forEach(item => {
        transportCounter = Math.max(transportCounter, item.id);
        addTransportItem(item);
    });

    // Restore AC items
    document.getElementById('acItems').innerHTML = '';
    state.acItems.forEach(item => {
        acCounter = Math.max(acCounter, item.id);
        addAcItem(item);
    });

    // Restore light items
    document.getElementById('lightItems').innerHTML = '';
    state.lightItems.forEach(item => {
        lightCounter = Math.max(lightCounter, item.id);
        addLightItem(item);
    });

    // Render waste inputs
    renderWasteInputs();
    calcWaste();
}

// === INIT ===
function init() {
    restoreInputs();
    renderEfTable();
    renderDistTable();
    updateAll();
}

document.addEventListener('DOMContentLoaded', init);

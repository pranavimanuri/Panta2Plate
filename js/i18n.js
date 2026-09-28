/**
 * Panta2Plate - Multilingual System (i18n)
 * Supports: Telugu (తెలుగు - Primary), Hindi (हिन्दी), English
 */

export const translations = {
  te: {
    // App Meta & Brand
    app_name: "పంట2ప్లేట్ (Panta2Plate)",
    tagline: "రైతు చేతి నుండి నేరుగా వినియోగదారుని పళ్ళెంలోకి",
    subtagline: "మధ్యవర్తులు లేని స్వచ్ఛమైన వ్యవసాయ సరఫరా",
    
    // Roles
    role_farmer: "రైతు (Farmer)",
    role_farmer_desc: "మీ పంటను మంచి ధరకు నేరుగా విక్రయించండి",
    role_supplier: "సరఫరాదారు (Supplier)",
    role_supplier_desc: "రైతుల వద్ద నుండి సేకరించి రెస్టారెంట్లకు అందించండి",
    role_restaurant: "రెస్టారెంట్ (Restaurant)",
    role_restaurant_desc: "రోజూ తాజా కూరగాయలు ఉత్తమ ధరకు పొందండి",
    
    // Onboarding & Auth
    choose_language: "మీ భాషను ఎంచుకోండి",
    choose_language_sub: "Choose your preferred language",
    select_role: "మీ పాత్రను ఎంచుకోండి",
    select_role_sub: "మీరు ఎలా లాగిన్ అవ్వాలనుకుంటున్నారు?",
    enter_phone: "మొబైల్ నంబర్ నమోదు చేయండి",
    phone_placeholder: "10 అంకెల మొబైల్ నంబర్",
    get_otp: "OTP పంపండి (Get OTP)",
    verify_otp: "OTP ని ధృవీకరించండి",
    otp_sent_to: "ఈ నంబర్‌కు OTP పంపబడింది:",
    enter_otp_hint: "4-అంకెల కోడ్ నమోదు చేయండి (డెమో: 1234)",
    login_btn: "లాగిన్ అవ్వండి",
    quick_demo_login: "⚡ డెమో తక్షణ లాగిన్",
    farmer_name_mock: "రామయ్య (Ramayya)",
    farmer_location_mock: "చేవెళ్ళ గ్రామం, రంగారెడ్డి జిల్లా",

    // Navigation & Common
    nav_home: "హోమ్",
    nav_listings: "నా పంటలు",
    nav_requests: "అభ్యర్థనలు",
    nav_orders: "ఆర్డర్లు",
    nav_inventory: "ఇన్వెంటరీ",
    nav_market: "మార్కెట్",
    nav_profile: "ప్రొఫైల్",
    back_btn: "వెనుకకు",
    next_btn: "తదుపరి",
    cancel_btn: "రద్దు చేయి",
    confirm_btn: "నిర్ధారించు",
    save_btn: "సేవ్ చేయి",
    submit_btn: "సమర్పించు",
    accept_btn: "అంగీకరించు",
    reject_btn: "తిరస్కరించు",
    view_details: "వివరాలు చూడండి",
    close_btn: "మూసివేయి",
    status: "స్థితి",
    active: "క్రియాశీల",
    pending: "వేచి ఉంది",
    completed: "పూర్తయింది",
    kg: "కిలోలు (kg)",
    per_kg: "ప్రతి కిలోకు",
    rupees: "₹",
    voice_assistant: "వాయిస్ సహాయం",
    listen_voice: "వినండి",
    today_mandi_rates: "నేటి మార్కెట్ / మండి ధరలు",
    verified_farmer: "ధృవీకరించబడిన రైతు",
    distance_away: "దూరం",
    
    // Farmer Home
    farmer_greeting: "నమస్కారం, రామయ్య గారు!",
    farmer_hero_title: "మీ పంటను నేరుగా విక్రయించండి",
    farmer_hero_desc: "మధ్యవర్తులు లేరు • తక్షణ పికప్ • 100% గ్యారెంటీ చెల్లింపు",
    sell_crop_cta: "🌿 కొత్త పంటను నమోదు చేయండి (Sell Crop)",
    quick_stats_title: "మీ అమ్మకాల సారాంశం",
    stat_listed: "నమోదిత పంటలు",
    stat_collected: "సేకరించబడినవి",
    stat_earnings: "మొత్తం ఆదాయం",
    active_listings_title: "మీ ప్రస్తుత పంట జాబితాలు",
    no_listings_yet: "ఇంకా ఎలాంటి పంట జాబితా చేయలేదు. క్రింది బటన్ నొక్కి జోడించండి.",
    incoming_pickup_alert: "కొత్త పికప్ అభ్యర్థన వచ్చింది!",
    
    // Farmer Listing Wizard
    step1_title: "దశ 1: పంట ఫోటో తీయండి",
    step1_sub: "మీ పొలంలో పండిన పంట ఫోటోను అప్‌లోడ్ చేయండి లేదా తీయండి",
    take_photo_btn: "📷 ఫోటో తీయండి",
    upload_photo_btn: "📁 గ్యాలరీ నుండి ఎంచుకోండి",
    ai_detecting: "పంట నాణ్యతను గుర్తిస్తోంది...",
    ai_detected_success: "✅ గుర్తించబడింది: నాటు టమాటాలు (Grade A)",
    
    step2_title: "దశ 2: పంట రకాన్ని ఎంచుకోండి",
    step2_sub: "మీరు విక్రయించదలిచిన కూరగాయను ఎంచుకోండి",
    crop_tomato: "టమాటాలు (Tomatoes)",
    crop_chilli: "పచ్చిమిర్చి (Green Chilli)",
    crop_onion: "ఉల్లిపాయలు (Onions)",
    crop_potato: "బంగాళాదుంప (Potato)",
    crop_brinjal: "వంకాయలు (Brinjal)",
    crop_leafy: "ఆకుకూరలు (Leafy Greens)",
    
    step3_title: "దశ 3: పరిమాణం నమోదు చేయండి",
    step3_sub: "మీ వద్ద ఎన్ని కిలోల పంట అందుబాటులో ఉంది?",
    quantity_label: "అందుబాటులో ఉన్న పరిమాణం",
    quick_add: "త్వరిత ఎంపిక:",
    
    step4_title: "దశ 4: మీరు కోరుకునే ధర (ధర/కిలో)",
    step4_sub: "ప్రస్తుత మండి ధరలను బట్టి మీ ధరను నిర్ణయించండి",
    price_label: "ఆశించిన ధర (₹/కిలో)",
    mandi_benchmark: "💡 నేటి మండి సూచన ధర: ₹28 - ₹32 / కిలో",
    total_expected_value: "మొత్తం అంచనా విలువ:",
    
    step5_title: "దశ 5: పికప్ చిరునామా & సమీక్ష",
    step5_sub: "మీ వివరాలను ఒకసారి సరిచూసుకోండి",
    pickup_location_label: "పికప్ గ్రామం / లొకేషన్",
    gps_detected: "📍 GPS ఆధారంగా: చేవెళ్ళ, రంగారెడ్డి (ఆటో డిటెక్ట్)",
    add_another_product: "➕ మరొక పంటను జోడించండి",
    publish_listing_btn: "🚀 జాబితాను సమర్పించండి (Publish)",
    
    // Listing Success
    listing_success_title: "పంట విజయవంతంగా నమోదైంది!",
    listing_success_desc: "మీ ప్రాంతంలోని సరఫరాదారులకు సమాచారం చేరింది. త్వరలోనే పికప్ అభ్యర్థన వస్తుంది.",
    listing_id_label: "జాబితా ఐడి:",
    go_to_home_btn: "హోమ్ పేజీకి వెళ్ళండి",
    
    // Farmer Pickup Request Modal / Flow
    pickup_request_received: "కొత్త పికప్ అభ్యర్థన!",
    supplier_name_label: "సరఫరాదారు:",
    pickup_qty_label: "అభ్యర్థించిన పరిమాణం:",
    offered_price_label: "ఆఫర్ చేసిన ధర:",
    pickup_eta_label: "అంచనా పికప్ సమయం:",
    accept_pickup_btn: "✅ అభ్యర్థనను అంగీకరించు",
    reject_pickup_btn: "❌ తిరస్కరించు",
    pickup_accepted_msg: "మీరు పికప్ అభ్యర్థనను అంగీకరించారు! సరఫరాదారు వాహనం బయలుదేరింది.",
    pickup_status_heading: "పికప్ స్థితి",
    status_on_the_way: "వాహనం మార్గంలో ఉంది",
    status_collected: "టమాటాలు విజయవంతంగా సేకరించబడ్డాయి",
    
    // Supplier Journey
    supplier_dashboard_title: "సరఫరాదారు డ్యాష్‌బోర్డ్ (Supplier Hub)",
    nearby_farmers_title: "సమీపంలోని రైతుల పంట లభ్యత",
    search_farmers_placeholder: "రైతు పేరు, పంట లేదా గ్రామం శోధించండి...",
    filter_all: "అన్నీ",
    filter_tomatoes: "టమాటాలు",
    filter_chillies: "మిర్చి",
    filter_onions: "ఉల్లి",
    distance_km: "కి.మీ దూరం",
    send_pickup_request_btn: "🚚 పికప్ అభ్యర్థన పంపండి",
    request_sent_success: "రైతుకు పికప్ అభ్యర్థన పంపబడింది!",
    
    // Supplier Collection & Pricing
    supplier_collect_title: "పంట సేకరణ & ఇన్వెంటరీ",
    mark_collected_btn: "📦 సేకరించబడిందిగా మార్క్ చేయండి",
    set_selling_price_title: "రెస్టారెంట్ విక్రయ ధరను నిర్ణయించండి",
    procurement_cost: "రైతు నుండి కొనుగోలు ధర: ₹30/కిలో",
    margin_recommendation: "సూచించిన మార్జిన్: ₹2/కిలో (రవాణా & హ్యాండ్లింగ్)",
    supplier_price_label: "రెస్టారెంట్ ధర (₹/కిలో):",
    add_to_inventory_btn: "✅ ఇన్వెంటరీకి జోడించండి",
    inventory_updated_success: "ఇన్వెంటరీ విజయవంతంగా అప్‌డేట్ చేయబడింది!",
    
    // Supplier Inventory & Restaurant Orders
    supplier_inventory_title: "ప్రస్తుత ఇన్వెంటరీ (Live Stock)",
    supplier_orders_title: "రెస్టారెంట్ల నుండి వచ్చిన ఆర్డర్లు",
    no_orders_yet: "ప్రస్తుతానికి కొత్త ఆర్డర్లు లేవు.",
    order_from: "ఆర్డర్ చేసిన రెస్టారెంట్:",
    order_items: "ఆర్డర్ వివరాలు:",
    order_total: "మొత్తం బిల్లు:",
    accept_order_btn: "✅ ఆర్డర్ అంగీకరించు",
    prepare_order_btn: "🍳 ప్యాకింగ్ ప్రారంభించు (Preparing)",
    dispatch_order_btn: "🚚 డెలివరీకి పంపండి (Out for Delivery)",
    mark_delivered_btn: "🏁 డెలివరీ పూర్తయింది (Delivered)",
    
    // Restaurant Journey
    restaurant_dashboard_title: "రెస్టారెంట్ మార్కెట్ ప్లేస్ (B2B Fresh)",
    search_produce_placeholder: "తాజా టమాటాలు, ఉల్లి, కూరగాయలు శోధించండి...",
    available_suppliers_title: "లభ్యమైన తాజా సరఫరాదారులు",
    compare_tag: "ధర & దూరం సరిపోల్చండి",
    supplier_name: "శ్రీ బాలాజీ ఆగ్రో లాజిస్టిక్స్",
    supplier_rating: "4.9 ⭐ (120+ డెలివరీలు)",
    freshness_guarantee: "నేటి ఉదయం పొలం నుండి సేకరించబడింది",
    order_now_btn: "🛒 ఆర్డర్ చేయండి",
    order_modal_title: "ఆర్డర్ పరిమాణాన్ని ఎంచుకోండి",
    select_order_qty: "కావలసిన పరిమాణం (కిలోలు)",
    bill_breakdown: "బిల్లు వివరాలు",
    item_subtotal: "ఉత్పత్తి ధర",
    delivery_fee: "రవాణా చార్జీలు (ఉచితం)",
    place_order_btn: "⚡ ఆర్డర్ ఖరారు చేయండి (Place Order)",
    order_success_title: "ఆర్డర్ విజయవంతంగా నమోదైంది!",
    order_id_label: "ఆర్డర్ సంఖ్య:",
    track_order_btn: "📍 ఆర్డర్ ట్రాక్ చేయండి",
    
    // Restaurant Demand Post
    demand_banner_title: "మీకు కావాల్సిన పంట దొరకలేదా?",
    demand_banner_desc: "మీ అవసరాన్ని పోస్ట్ చేయండి, సమీపంలోని రైతులు & సరఫరాదారులు అందిస్తారు.",
    post_demand_btn: "📝 ప్రత్యేక డిమాండ్ రిక్వెస్ట్ పెట్టండి",
    
    // Order Tracking Timeline
    tracking_title: "లైవ్ డెలివరీ ట్రాకింగ్",
    step_placed: "ఆర్డర్ నమోదైంది",
    step_accepted: "సరఫరాదారు అంగీకరించారు",
    step_preparing: "తాజా పంట ప్యాక్ అవుతోంది",
    step_dispatched: "డెలివరీ బయలుదేరింది",
    step_delivered: "విజయవంతంగా డెలివరీ చేయబడింది",
    estimated_arrival: "అంచనా చేరే సమయం: 25 నిమిషాలు",
    driver_info: "డ్రైవర్: రమేష్ (EV ఆటో - TS 09 EC 2026)",
    call_driver: "📞 డ్రైవర్‌కి కాల్ చేయండి",

    // Demo Assistant Bar
    demo_guide_title: "హ్యాకథాన్ లైవ్ డెమో ఫ్లో",
    demo_step_1: "1. రైతు: 100 kg టమాటాలు ₹30 కు జాబితా చేయండి",
    demo_step_2: "2. సరఫరాదారు: పికప్ అభ్యర్థన పంపండి",
    demo_step_3: "3. రైతు: పికప్ అభ్యర్థన అంగీకరించండి",
    demo_step_4: "4. సరఫరాదారు: సేకరించి ₹32 కు ఇన్వెంటరీలో చేర్చండి",
    demo_step_5: "5. రెస్టారెంట్: 50 kg టమాటాలు ఆర్డర్ చేయండి",
    demo_step_6: "6. సరఫరాదారు: డెలివరీ చేయండి (పూర్తయింది!)",
    reset_demo_btn: "రీసెట్ డెమో (Reset)",
    role_switch_prompt: "పాత్ర మార్చుకోండి:"
  },

  hi: {
    // App Meta & Brand
    app_name: "पंटा2प्लेट (Panta2Plate)",
    tagline: "खेत से सीधे उपभोक्ता की थाली तक",
    subtagline: "बिचौलियों के बिना पारदर्शी कृषि आपूर्ति",
    
    // Roles
    role_farmer: "किसान (Farmer)",
    role_farmer_desc: "अपनी फसल को सही दाम पर सीधे बेचें",
    role_supplier: "आपूर्तिकर्ता (Supplier)",
    role_supplier_desc: "किसानों से ताज़ा फसल लेकर रेस्टोरेंट तक पहुँचाएं",
    role_restaurant: "रेस्टोरेंट (Restaurant)",
    role_restaurant_desc: "रोज़ाना ताज़ी सब्जियां सबसे कम दाम में पाएं",
    
    // Onboarding & Auth
    choose_language: "अपनी भाषा चुनें",
    choose_language_sub: "Choose your preferred language",
    select_role: "अपनी भूमिका चुनें",
    select_role_sub: "आप किस रूप में लॉगिन करना चाहते हैं?",
    enter_phone: "मोबाइल नंबर दर्ज करें",
    phone_placeholder: "10 अंकों का मोबाइल नंबर",
    get_otp: "OTP भेजें (Get OTP)",
    verify_otp: "OTP सत्यापित करें",
    otp_sent_to: "इस नंबर पर OTP भेजा गया है:",
    enter_otp_hint: "4-अंकों का कोड दर्ज करें (डेमो: 1234)",
    login_btn: "लॉगिन करें",
    quick_demo_login: "⚡ डेमो तुरंत लॉगिन",
    farmer_name_mock: "रामय्या (Ramayya)",
    farmer_location_mock: "चेवेल्ला गांव, रंगारेड्डी जिला",

    // Navigation & Common
    nav_home: "होम",
    nav_listings: "मेरी फसलें",
    nav_requests: "अनुरोध",
    nav_orders: "ऑर्डर",
    nav_inventory: "इन्वेंट्री",
    nav_market: "मार्केट",
    nav_profile: "प्रोफ़ाइल",
    back_btn: "वापस",
    next_btn: "आगे बढ़ें",
    cancel_btn: "रद्द करें",
    confirm_btn: "पुष्टि करें",
    save_btn: "सहेजें",
    submit_btn: "जमा करें",
    accept_btn: "स्वीकार करें",
    reject_btn: "अस्वीकार करें",
    view_details: "विवरण देखें",
    close_btn: "बंद करें",
    status: "स्थिति",
    active: "सक्रिय",
    pending: "प्रतीक्षारत",
    completed: "पूर्ण",
    kg: "किलो (kg)",
    per_kg: "प्रति किलो",
    rupees: "₹",
    voice_assistant: "वॉयस सहायता",
    listen_voice: "सुनें",
    today_mandi_rates: "आज के मंडी भाव",
    verified_farmer: "सत्यापित किसान",
    distance_away: "दूरी",
    
    // Farmer Home
    farmer_greeting: "नमस्ते, रामय्या जी!",
    farmer_hero_title: "अपनी फसल सीधे बेचें",
    farmer_hero_desc: "कोई बिचौलिया नहीं • तुरंत पिकअप • 100% सुरक्षित भुगतान",
    sell_crop_cta: "🌿 नई फसल दर्ज करें (Sell Crop)",
    quick_stats_title: "आपकी बिक्री का सारांश",
    stat_listed: "दर्ज फसलें",
    stat_collected: "पिकअप हुई",
    stat_earnings: "कुल कमाई",
    active_listings_title: "आपकी सक्रिय फसलें",
    no_listings_yet: "अभी कोई फसल दर्ज नहीं है। नीचे दिए बटन से जोड़ें।",
    incoming_pickup_alert: "नया पिकअप अनुरोध प्राप्त हुआ!",
    
    // Farmer Listing Wizard
    step1_title: "चरण 1: फसल की तस्वीर लें",
    step1_sub: "अपने खेत की ताज़ा फसल की तस्वीर लें या अपलोड करें",
    take_photo_btn: "📷 तस्वीर लें",
    upload_photo_btn: "📁 गैलरी से चुनें",
    ai_detecting: "फसल की गुणवत्ता जांची जा रही है...",
    ai_detected_success: "✅ पहचानी गई फसल: देशी टमाटर (Grade A)",
    
    step2_title: "चरण 2: फसल का प्रकार चुनें",
    step2_sub: "जो सब्जी आप बेचना चाहते हैं उसे चुनें",
    crop_tomato: "टमाटर (Tomatoes)",
    crop_chilli: "हरी मिर्च (Green Chilli)",
    crop_onion: "प्याज (Onions)",
    crop_potato: "आलू (Potato)",
    crop_brinjal: "बैंगन (Brinjal)",
    crop_leafy: "हरी पत्तेदार सब्जियां (Leafy Greens)",
    
    step3_title: "चरण 3: मात्रा दर्ज करें",
    step3_sub: "आपके पास कितने किलो फसल उपलब्ध है?",
    quantity_label: "उपलब्ध मात्रा (किलो में)",
    quick_add: "त्वरित मात्रा:",
    
    step4_title: "चरण 4: अपेक्षित मूल्य (मूल्य/किलो)",
    step4_sub: "मंडी के भाव अनुसार अपना मूल्य तय करें",
    price_label: "अपेक्षित मूल्य (₹/किलो)",
    mandi_benchmark: "💡 आज का मंडी सुझाव मूल्य: ₹28 - ₹32 / किलो",
    total_expected_value: "कुल अपेक्षित मूल्य:",
    
    step5_title: "चरण 5: पिकअप पता व समीक्षा",
    step5_sub: "अपने विवरण की पुष्टि करें",
    pickup_location_label: "पिकअप का स्थान / गांव",
    gps_detected: "📍 GPS अनुसार: चेवेल्ला, रंगारेड्डी (स्वतः चुना गया)",
    add_another_product: "➕ एक और उत्पाद जोड़ें",
    publish_listing_btn: "🚀 फसल लिस्ट करें (Publish)",
    
    // Listing Success
    listing_success_title: "फसल सफलतापूर्वक दर्ज हो गई!",
    listing_success_desc: "आपके क्षेत्र के सप्लायर्स को सूचना भेज दी गई है। जल्द ही पिकअप अनुरोध आएगा।",
    listing_id_label: "लिस्टिंग आईडी:",
    go_to_home_btn: "होम पेज पर जाएं",
    
    // Farmer Pickup Request Modal / Flow
    pickup_request_received: "नया पिकअप अनुरोध!",
    supplier_name_label: "आपूर्तिकर्ता:",
    pickup_qty_label: "मांगी गई मात्रा:",
    offered_price_label: "प्रस्तावित मूल्य:",
    pickup_eta_label: "अनुमानित पिकअप समय:",
    accept_pickup_btn: "✅ अनुरोध स्वीकार करें",
    reject_pickup_btn: "❌ अस्वीकार करें",
    pickup_accepted_msg: "आपने अनुरोध स्वीकार कर लिया है! वाहन रवाना हो चुका है।",
    pickup_status_heading: "पिकअप स्थिति",
    status_on_the_way: "गाड़ी रास्ते में है",
    status_collected: "टमाटर सफलतापूर्वक एकत्र कर लिए गए",
    
    // Supplier Journey
    supplier_dashboard_title: "सप्लायर डैशबोर्ड (Supplier Hub)",
    nearby_farmers_title: "आस-पास के किसानों की उपलब्ध फसल",
    search_farmers_placeholder: "किसान, फसल या गांव खोजें...",
    filter_all: "सभी",
    filter_tomatoes: "टमाटर",
    filter_chillies: "मिर्च",
    filter_onions: "प्याज",
    distance_km: "किमी दूर",
    send_pickup_request_btn: "🚚 पिकअप अनुरोध भेजें",
    request_sent_success: "किसान को पिकअप अनुरोध भेज दिया गया है!",
    
    // Supplier Collection & Pricing
    supplier_collect_title: "फसल संग्रहण व इन्वेंट्री",
    mark_collected_btn: "📦 प्राप्त किया गया (Mark as Collected)",
    set_selling_price_title: "रेस्टोरेंट बिक्री मूल्य तय करें",
    procurement_cost: "किसान से खरीद मूल्य: ₹30/किलो",
    margin_recommendation: "सुझावित मार्जिन: ₹2/किलो (परिवहन व हैंडलिंग)",
    supplier_price_label: "रेस्टोरेंट बिक्री मूल्य (₹/किलो):",
    add_to_inventory_btn: "✅ इन्वेंट्री में जोड़ें",
    inventory_updated_success: "इन्वेंट्री सफलतापूर्वक अपडेट हो गई!",
    
    // Supplier Inventory & Restaurant Orders
    supplier_inventory_title: "उपलब्ध स्टॉक (Live Inventory)",
    supplier_orders_title: "रेस्टोरेंट्स से आए ऑर्डर",
    no_orders_yet: "वर्तमान में कोई नया ऑर्डर नहीं है।",
    order_from: "ऑर्डरकर्ता रेस्टोरेंट:",
    order_items: "सामग्री:",
    order_total: "कुल बिल:",
    accept_order_btn: "✅ ऑर्डर स्वीकार करें",
    prepare_order_btn: "🍳 तैयारी शुरू करें (Preparing)",
    dispatch_order_btn: "🚚 डिलीवरी के लिए रवाना (Out for Delivery)",
    mark_delivered_btn: "🏁 डिलीवरी पूर्ण (Delivered)",
    
    // Restaurant Journey
    restaurant_dashboard_title: "रेस्टोरेंट मार्केटप्लेस (B2B Fresh)",
    search_produce_placeholder: "ताज़ा टमाटर, प्याज, सब्जियां खोजें...",
    available_suppliers_title: "उपलब्ध विश्वसनीय आपूर्तिकर्ता",
    compare_tag: "दाम और दूरी की तुलना करें",
    supplier_name: "श्री बालाजी एग्रो लॉजिस्टिक्स",
    supplier_rating: "4.9 ⭐ (120+ सफल डिलीवरी)",
    freshness_guarantee: "आज सुबह खेत से सीधे तोड़ा गया",
    order_now_btn: "🛒 ऑर्डर करें",
    order_modal_title: "मात्रा चुनें व ऑर्डर करें",
    select_order_qty: "मात्रा (किलो में)",
    bill_breakdown: "बिल का विवरण",
    item_subtotal: "सामान की कीमत",
    delivery_fee: "डिलीवरी शुल्क (मुफ्त)",
    place_order_btn: "⚡ ऑर्डर पूरा करें (Place Order)",
    order_success_title: "ऑर्डर सफलतापूर्वक दर्ज हुआ!",
    order_id_label: "ऑर्डर संख्या:",
    track_order_btn: "📍 ऑर्डर ट्रैक करें",
    
    // Restaurant Demand Post
    demand_banner_title: "मनचाही सब्जी नहीं मिली?",
    demand_banner_desc: "अपनी मांग दर्ज करें, स्थानीय किसान व सप्लायर उपलब्ध कराएंगे।",
    post_demand_btn: "📝 विशेष मांग दर्ज करें",
    
    // Order Tracking Timeline
    tracking_title: "लाइव डिलीवरी ट्रैकिंग",
    step_placed: "ऑर्डर प्राप्त हुआ",
    step_accepted: "सप्लायर द्वारा स्वीकृत",
    step_preparing: "ताज़ा फसल पैक हो रही है",
    step_dispatched: "डिलीवरी रास्ते में है",
    step_delivered: "सफलतापूर्वक डिलीवर हो गया",
    estimated_arrival: "अनुमानित समय: 25 मिनट",
    driver_info: "चालक: रमेश (EV ऑटो - TS 09 EC 2026)",
    call_driver: "📞 ड्राइवर को कॉल करें",

    // Demo Assistant Bar
    demo_guide_title: "हैकाथॉन लाइव डेमो फ्लो",
    demo_step_1: "1. किसान: 100 kg टमाटर ₹30 में लिस्ट करें",
    demo_step_2: "2. सप्लायर: पिकअप अनुरोध भेजें",
    demo_step_3: "3. किसान: पिकअप अनुरोध स्वीकार करें",
    demo_step_4: "4. सप्लायर: प्राप्त कर ₹32 में इन्वेंट्री में जोड़ें",
    demo_step_5: "5. रेस्टोरेंट: 50 kg टमाटर ऑर्डर करें",
    demo_step_6: "6. सप्लायर: डिलीवरी पूर्ण करें",
    reset_demo_btn: "रीसेट डेमो (Reset)",
    role_switch_prompt: "भूमिका बदलें:"
  },

  en: {
    // App Meta & Brand
    app_name: "Panta2Plate",
    tagline: "Direct from Farmer's Field to Restaurant's Plate",
    subtagline: "Zero middlemen, 100% fair agricultural supply chain",
    
    // Roles
    role_farmer: "Farmer (రైతు)",
    role_farmer_desc: "List fresh crops directly and get fair market prices instantly",
    role_supplier: "Supplier / Aggregator",
    role_supplier_desc: "Pick up fresh produce from local farms and supply restaurants",
    role_restaurant: "Restaurant / Kitchen",
    role_restaurant_desc: "Source fresh, farm-direct vegetables daily with fast delivery",
    
    // Onboarding & Auth
    choose_language: "Select Language / భాష ఎంచుకోండి",
    choose_language_sub: "Choose your preferred application language",
    select_role: "Select Your Role",
    select_role_sub: "How would you like to use Panta2Plate today?",
    enter_phone: "Enter Mobile Number",
    phone_placeholder: "10-digit mobile number",
    get_otp: "Get OTP",
    verify_otp: "Verify OTP Code",
    otp_sent_to: "OTP sent to:",
    enter_otp_hint: "Enter 4-digit code (Demo: 1234)",
    login_btn: "Verify & Login",
    quick_demo_login: "⚡ 1-Click Demo Login",
    farmer_name_mock: "Ramayya (రామయ్య)",
    farmer_location_mock: "Chevella Village, Ranga Reddy Dist",

    // Navigation & Common
    nav_home: "Home",
    nav_listings: "My Crops",
    nav_requests: "Requests",
    nav_orders: "Orders",
    nav_inventory: "Inventory",
    nav_market: "Marketplace",
    nav_profile: "Profile",
    back_btn: "Back",
    next_btn: "Next",
    cancel_btn: "Cancel",
    confirm_btn: "Confirm",
    save_btn: "Save",
    submit_btn: "Submit",
    accept_btn: "Accept",
    reject_btn: "Reject",
    view_details: "View Details",
    close_btn: "Close",
    status: "Status",
    active: "Active",
    pending: "Pending",
    completed: "Completed",
    kg: "kg",
    per_kg: "per kg",
    rupees: "₹",
    voice_assistant: "Voice Assistant",
    listen_voice: "Listen",
    today_mandi_rates: "Today's Mandi Market Rates",
    verified_farmer: "Verified Farmer",
    distance_away: "Distance",
    
    // Farmer Home
    farmer_greeting: "Welcome back, Ramayya garu!",
    farmer_hero_title: "Sell Your Harvest Directly",
    farmer_hero_desc: "Zero commission • Verified buyers • Guaranteed payment on pickup",
    sell_crop_cta: "🌿 List New Crop (Sell Crop)",
    quick_stats_title: "Your Sales Summary",
    stat_listed: "Crops Listed",
    stat_collected: "Picked Up",
    stat_earnings: "Total Income",
    active_listings_title: "Your Active Listings",
    no_listings_yet: "No crops listed yet. Tap the button below to add your first crop.",
    incoming_pickup_alert: "New pickup request received!",
    
    // Farmer Listing Wizard
    step1_title: "Step 1: Crop Photo",
    step1_sub: "Take a photo of your fresh crop or select from gallery",
    take_photo_btn: "📷 Take Photo",
    upload_photo_btn: "📁 Choose from Gallery",
    ai_detecting: "Analyzing crop quality with AI...",
    ai_detected_success: "✅ Detected: Fresh Farm Tomatoes (Grade A)",
    
    step2_title: "Step 2: Select Produce Type",
    step2_sub: "Choose the vegetable or crop you want to list",
    crop_tomato: "Tomatoes (టమాటాలు)",
    crop_chilli: "Green Chilli (పచ్చిమిర్చి)",
    crop_onion: "Red Onions (ఉల్లిపాయలు)",
    crop_potato: "Potatoes (బంగాళాదుంప)",
    crop_brinjal: "Brinjal (వంకాయలు)",
    crop_leafy: "Leafy Greens (ఆకుకూరలు)",
    
    step3_title: "Step 3: Enter Quantity",
    step3_sub: "How many kilograms of produce are ready for harvest?",
    quantity_label: "Available Quantity (kg)",
    quick_add: "Quick Select:",
    
    step4_title: "Step 4: Your Expected Price (₹/kg)",
    step4_sub: "Set your target price based on current market trends",
    price_label: "Expected Price (₹/kg)",
    mandi_benchmark: "💡 Today's Mandi Benchmark: ₹28 - ₹32 / kg",
    total_expected_value: "Total Expected Value:",
    
    step5_title: "Step 5: Pickup Location & Review",
    step5_sub: "Verify your pickup farm location",
    pickup_location_label: "Farm Location",
    gps_detected: "📍 GPS Detected: Chevella, Ranga Reddy Dist",
    add_another_product: "➕ Add Another Product",
    publish_listing_btn: "🚀 Publish Crop Listing",
    
    // Listing Success
    listing_success_title: "Crop Listed Successfully!",
    listing_success_desc: "Local suppliers within 15 km have been notified. You will receive pickup requests shortly.",
    listing_id_label: "Listing ID:",
    go_to_home_btn: "Go to Dashboard",
    
    // Farmer Pickup Request Modal / Flow
    pickup_request_received: "New Pickup Request!",
    supplier_name_label: "Supplier:",
    pickup_qty_label: "Requested Quantity:",
    offered_price_label: "Offered Price:",
    pickup_eta_label: "Estimated Pickup ETA:",
    accept_pickup_btn: "✅ Accept Pickup Request",
    reject_pickup_btn: "❌ Decline Request",
    pickup_accepted_msg: "Pickup request accepted! Supplier vehicle has been dispatched.",
    pickup_status_heading: "Pickup Status",
    status_on_the_way: "Vehicle on the way",
    status_collected: "Tomatoes successfully collected",
    
    // Supplier Journey
    supplier_dashboard_title: "Supplier Hub",
    nearby_farmers_title: "Nearby Farm Harvest Listings",
    search_farmers_placeholder: "Search farmer, crop or village...",
    filter_all: "All",
    filter_tomatoes: "Tomatoes",
    filter_chillies: "Chillies",
    filter_onions: "Onions",
    distance_km: "km away",
    send_pickup_request_btn: "🚚 Send Pickup Request",
    request_sent_success: "Pickup request sent to the farmer!",
    
    // Supplier Collection & Pricing
    supplier_collect_title: "Harvest Collection & Pricing",
    mark_collected_btn: "📦 Mark as Collected",
    set_selling_price_title: "Set Restaurant Wholesale Price",
    procurement_cost: "Farmer Cost: ₹30/kg",
    margin_recommendation: "Recommended Margin: +₹2/kg (Handling & Logistics)",
    supplier_price_label: "Restaurant Price (₹/kg):",
    add_to_inventory_btn: "✅ Add to Inventory",
    inventory_updated_success: "Inventory updated! Available for restaurant orders.",
    
    // Supplier Inventory & Restaurant Orders
    supplier_inventory_title: "Active Inventory (Live Stock)",
    supplier_orders_title: "Incoming Restaurant Orders",
    no_orders_yet: "No incoming orders right now.",
    order_from: "Restaurant:",
    order_items: "Items:",
    order_total: "Total Bill:",
    accept_order_btn: "✅ Accept Order",
    prepare_order_btn: "🍳 Start Packing (Preparing)",
    dispatch_order_btn: "🚚 Dispatch (Out for Delivery)",
    mark_delivered_btn: "🏁 Mark Delivered",
    
    // Restaurant Journey
    restaurant_dashboard_title: "Restaurant Marketplace (B2B Fresh)",
    search_produce_placeholder: "Search farm-fresh tomatoes, vegetables...",
    available_suppliers_title: "Available Verified Suppliers",
    compare_tag: "Compare Price & Distance",
    supplier_name: "Sri Balaji Agro Logistics",
    supplier_rating: "4.9 ⭐ (120+ deliveries)",
    freshness_guarantee: "Harvested this morning from Chevella Farm",
    order_now_btn: "🛒 Order Now",
    order_modal_title: "Select Quantity & Order",
    select_order_qty: "Required Quantity (kg)",
    bill_breakdown: "Bill Breakdown",
    item_subtotal: "Produce Total",
    delivery_fee: "Direct Delivery (Free)",
    place_order_btn: "⚡ Confirm & Place Order",
    order_success_title: "Order Placed Successfully!",
    order_id_label: "Order ID:",
    track_order_btn: "📍 Track Live Delivery",
    
    // Restaurant Demand Post
    demand_banner_title: "Couldn't find what you need?",
    demand_banner_desc: "Post a custom produce request and local suppliers will fulfil it.",
    post_demand_btn: "📝 Post Custom Demand",
    
    // Order Tracking Timeline
    tracking_title: "Live Order Delivery Tracking",
    step_placed: "Order Placed",
    step_accepted: "Supplier Accepted",
    step_preparing: "Sorting & Packing",
    step_dispatched: "Out for Delivery",
    step_delivered: "Delivered to Kitchen",
    estimated_arrival: "Estimated Arrival: 25 mins",
    driver_info: "Driver: Ramesh (EV Commercial - TS 09 EC 2026)",
    call_driver: "📞 Call Delivery Driver",

    // Demo Assistant Bar
    demo_guide_title: "Hackathon Live Demo Flow",
    demo_step_1: "1. Farmer: List 100 kg Tomatoes @ ₹30/kg",
    demo_step_2: "2. Supplier: Send pickup request",
    demo_step_3: "3. Farmer: Accept pickup request",
    demo_step_4: "4. Supplier: Collect & price @ ₹32/kg in inventory",
    demo_step_5: "5. Restaurant: Order 50 kg Tomatoes",
    demo_step_6: "6. Supplier: Accept & deliver (Done!)",
    reset_demo_btn: "Reset Demo",
    role_switch_prompt: "Switch Persona:"
  }
};

let currentLang = localStorage.getItem("panta_lang") || "te";

export function getLang() {
  return currentLang;
}

export function setLang(lang) {
  if (translations[lang]) {
    currentLang = lang;
    localStorage.setItem("panta_lang", lang);
    document.documentElement.lang = lang;
    window.dispatchEvent(new CustomEvent("panta:lang_changed", { detail: { lang } }));
  }
}

export function t(key) {
  const dict = translations[currentLang] || translations.te;
  return dict[key] || translations.en[key] || key;
}

export function getCropName(cropKey) {
  const dict = translations[currentLang] || translations.te;
  const keyMap = {
    tomato: "crop_tomato",
    chilli: "crop_chilli",
    onion: "crop_onion",
    potato: "crop_potato",
    brinjal: "crop_brinjal",
    leafy: "crop_leafy"
  };
  return dict[keyMap[cropKey]] || cropKey;
}

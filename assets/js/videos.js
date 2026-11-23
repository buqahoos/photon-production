/*
 * Photon Production: portfolio data
 * ---------------------------------------------------------------
 * Every public video on https://vimeo.com/bugahhoos is listed here.
 * The site ALSO checks Vimeo when it loads, so any new upload appears
 * automatically (under "All") even if you forget to add it here.
 *
 * To edit a project: change its title, client, year or categories.
 * Categories: "motion", "vfx", "3d", "post"
 * featured: true  -> shown as the large card at the top of the grid
 * wide: true      -> card spans two columns (keeps the grid rows full)
 * hidden:   true  -> keeps a Vimeo video off the website
 * ar: { client, note } -> Arabic text for the Arabic site (titles stay as on Vimeo)
 */
window.PHOTON_VIDEOS = [
  { id: 418413225,  title: "Motion Graphics Reel",          client: "Showreel",                         year: 2020, cats: ["motion"],        featured: true, w: 1280, h: 720,
    ar: { client: "ريل الأعمال" } },
  { id: 1104898513, title: "Zain VFX Breakdown",            client: "Zain",                             year: 2021, cats: ["vfx", "post"],   w: 1920, h: 1080,
    ar: { client: "زين" } },
  { id: 921469764,  title: "Toyota Raize",                  client: "Toyota",                           year: 2023, cats: ["3d", "vfx"],     w: 1920, h: 1080,
    ar: { client: "تويوتا" } },
  { id: 845692556,  title: "ISF Gymnasiade Bahrain 2024",   client: "ISF Gymnasiade",                   year: 2024, cats: ["motion"],        w: 1920, h: 1080 },
  { id: 843750413,  title: "Khaleeji Bank Logo Reveal",     client: "Khaleeji Bank",                    year: 2023, cats: ["motion", "3d"],  w: 1920, h: 1080 },
  { id: 412456724,  title: "Salam Airlines VFX Breakdown", client: "Salam Airlines",                   year: 2019, cats: ["vfx", "3d"],     w: 1920, h: 1080, wide: true,
    note: "All CGI shots: prep, asset creation, animation, look dev and compositing. Houdini clouds, Maya, Arnold and Nuke.",
    ar: { client: "طيران السلام", note: "جميع لقطات الـCGI: التحضير، وبناء العناصر، والتحريك، وتطوير المظهر، والدمج. السحب بـHoudini، مع Maya وArnold وNuke." } },
  { id: 534710526,  title: "TRA Motion Graphics",           client: "TRA Bahrain",                      year: 2021, cats: ["motion"],        w: 1920, h: 1080,
    ar: { client: "هيئة تنظيم الاتصالات" } },
  { id: 361278538,  title: "The Color Hunt",                client: "Personal project",                 year: 2019, cats: ["vfx", "3d"],     w: 1920, h: 1080,
    note: "Grooming, animation, shooting, compositing and FX, about three months from start to finish.",
    ar: { client: "مشروع شخصي", note: "الـGrooming والتحريك والتصوير والدمج والمؤثرات، خلال نحو ثلاثة أشهر من البداية حتى النهاية." } },
  { id: 501262986,  title: "RERA Escrow Accounts",          client: "Real Estate Regulatory Authority", year: 2020, cats: ["motion"],        w: 1280, h: 720,
    ar: { client: "مؤسسة التنظيم العقاري" } },
  { id: 496605536,  title: "KFH ATM Card Activation",       client: "Kuwait Finance House",             year: 2021, cats: ["3d", "motion"],  w: 720,  h: 900,
    ar: { client: "بيت التمويل الكويتي" } },
  { id: 443385237,  title: "KFH NFC ATMs",                  client: "Kuwait Finance House",             year: 2020, cats: ["motion"],        w: 1080, h: 1920,
    ar: { client: "بيت التمويل الكويتي" } },
  { id: 464010079,  title: "Instant Cards",                 client: "Kuwait Finance House",             year: 2020, cats: ["motion"],        w: 1080, h: 1350,
    ar: { client: "بيت التمويل الكويتي" } },
  { id: 472924407,  title: "Flavors",                       client: "Personal project",                 year: 2018, cats: ["3d", "vfx"],     w: 1280, h: 720,
    ar: { client: "مشروع شخصي" } },
  { id: 334519674,  title: "Flavors Breakdown",             client: "Personal project",                 year: 2018, cats: ["3d", "vfx"],     w: 1280, h: 720,
    note: "Shot, modelled, animated and composited in six weeks.",
    ar: { client: "مشروع شخصي", note: "تصوير ونمذجة وتحريك ودمج خلال ستة أسابيع." } },
  { id: 340953228,  title: "Roto & Comp Breakdown",         client: "Compositing",                      year: 2019, cats: ["vfx", "post"],   w: 1920, h: 1080,
    ar: { client: "دمج المؤثرات" } },
  { id: 418426107,  title: "Khairia",                       client: "TV spot",                          year: 2017, cats: ["post", "motion"],w: 1920, h: 1080,
    ar: { client: "إعلان تلفزيوني" } },
  { id: 409156962,  title: "Kaboos",                        client: "",                                 year: 2014, cats: ["post"],          w: 1920, h: 1080 }
];

window.PHOTON_VIMEO_USER = "bugahhoos";

/* Thumbnail base URLs from Vimeo (size is appended by the site, e.g. "960x540"). */
window.PHOTON_THUMBS = {
  "1104898513": "https://i.vimeocdn.com/video/2041280917-c751223f8ce5d3c97f4c371ac0a7b3c38de7a30f9fc980cd00896e2c9414ba75-d_",
  "921469764": "https://i.vimeocdn.com/video/1811918921-177e1a3a9b883e35510188f7441375e600f51a71dfde7df8228984c12a1c6af2-d_",
  "845692556": "https://i.vimeocdn.com/video/1698337016-63834d70ff6ec38e5b55d8395a45d7eea45b7412029d049a803463e1527132e4-d_",
  "843750413": "https://i.vimeocdn.com/video/1695632337-09c742facb0ebc1b60f83b3c8658f0c2b2c297a01bfc1023e9da7f0bc8a369c3-d_",
  "534710526": "https://i.vimeocdn.com/video/1106833913-54b8db11015c7d44e7d8c6a712ae746eed31968a2620c52818912dd4de5aea4d-d_",
  "501262986": "https://i.vimeocdn.com/video/1037107842-06e10e439067ca8095fa60baf28e2646045863cbb024f550604de1028d77210d-d_",
  "496605536": "https://i.vimeocdn.com/video/1027752471-3ceae73ad71e935948fb983c7fc0dc0d4a39f3ab9872a26d1eeefac1734d4ab2-d_",
  "472924407": "https://i.vimeocdn.com/video/983613033-50668d9526cd19b3ac2c15009832b2a8136462c737009de568fd61dfe352e260-d_",
  "464010079": "https://i.vimeocdn.com/video/967767702-d75c358f9cfe725c72397a6eeac7efe0fedcdf97b45f811c23bf41a630621b0e-d_",
  "443385237": "https://i.vimeocdn.com/video/932956641-3f47e8fcc19fe28302f9047b6eb4a055fe1c932f96c76763e0f851533fa774ff-d_",
  "418426107": "https://i.vimeocdn.com/video/892993465-7ac09d5987b5dbabc1a94ba34bfeb718f8141aa723e67728b20839a7aa6586e7-d_",
  "418413225": "https://i.vimeocdn.com/video/892976553-b4b4d7816731fe2657bb1e8c7e862c20ee9f45b712b1a62ecf8ebc9247292a58-d_",
  "412456724": "https://i.vimeocdn.com/video/1135662857-e113c16588b2248f18f1bcb041a942340e61377e139768428a94be92fedcb636-d_",
  "409156962": "https://i.vimeocdn.com/video/880358028-e4e235d6f5812528fa84b5d0caa73cf05b6990d42ca9f9feeda18f87f808b243-d_",
  "361278538": "https://i.vimeocdn.com/video/824774041-71758566e82283e73c96fa750deca7a81ecd45a1ebb78aa80a64ea4651be866f-d_",
  "340953228": "https://i.vimeocdn.com/video/789434234-9ebba5740eff45aab576e268387763bde5b9094b137d0c007f39fdb5969bb76f-d_",
  "334519674": "https://i.vimeocdn.com/video/780837455-685a8bf5b5950294a2c6c5a00de6fc4377fc5161fc0562989ca807fa31283d32-d_"
};

/** Provinces et villes de la RDC */

export interface Province {
  name: string;
  cities: string[];
}

export const provinces: Province[] = [
  {
    name: "Kinshasa",
    cities: ["Kinshasa"],
  },
  {
    name: "Kongo-Central",
    cities: ["Matadi", "Boma", "Moanda", "Mbanza-Ngungu", "Lukala", "Tshela", "Kasangulu", "Songololo", "Seke-Banza", "Kimvula", "Madimba", "Luozi"],
  },
  {
    name: "Kwango",
    cities: ["Kenge", "Kahemba", "Feshi", "Kasongo-Lunda", "Popokabaka"],
  },
  {
    name: "Kwilu",
    cities: ["Bandundu", "Kikwit", "Idiofa", "Bulungu", "Bagata", "Masi-Manimba", "Gungu"],
  },
  {
    name: "Mai-Ndombe",
    cities: ["Inongo", "Nioki", "Kutu", "Kiri", "Oshwe", "Bokoro", "Mushie", "Yumbi"],
  },
  {
    name: "Équateur",
    cities: ["Mbandaka", "Bikoro", "Bolomba", "Bomongo", "Ingende", "Lukolela", "Basankusu"],
  },
  {
    name: "Mongala",
    cities: ["Lisala", "Bumba", "Bongandanga"],
  },
  {
    name: "Nord-Ubangi",
    cities: ["Gbadolite", "Mobayi-Mbongo", "Yakoma", "Businga"],
  },
  {
    name: "Sud-Ubangi",
    cities: ["Gemena", "Libenge", "Zongo", "Budjala", "Kungu"],
  },
  {
    name: "Tshuapa",
    cities: ["Boende", "Befale", "Bokungu", "Djolu", "Ikela", "Monkoto"],
  },
  {
    name: "Tshopo",
    cities: ["Kisangani", "Isangi", "Yahuma", "Basoko", "Banalia", "Bafwasende", "Ubundu", "Opala"],
  },
  {
    name: "Bas-Uélé",
    cities: ["Buta", "Aketi", "Ango", "Bambesa", "Poko", "Dingila"],
  },
  {
    name: "Haut-Uélé",
    cities: ["Isiro", "Dungu", "Faradje", "Watsa", "Niangara", "Rungu", "Wamba"],
  },
  {
    name: "Ituri",
    cities: ["Bunia", "Aru", "Mahagi", "Djugu", "Irumu", "Mambasa"],
  },
  {
    name: "Nord-Kivu",
    cities: ["Goma", "Beni", "Butembo", "Lubero", "Masisi", "Rutshuru", "Walikale", "Nyiragongo"],
  },
  {
    name: "Sud-Kivu",
    cities: ["Bukavu", "Uvira", "Baraka", "Kabare", "Walungu", "Kalehe", "Mwenga", "Shabunda", "Fizi", "Idjwi"],
  },
  {
    name: "Maniema",
    cities: ["Kindu", "Kasongo", "Kabambare", "Kibombo", "Lubutu", "Pangi", "Punia", "Kailo"],
  },
  {
    name: "Haut-Katanga",
    cities: ["Lubumbashi", "Likasi", "Kipushi", "Kambove", "Mitwaba", "Pweto", "Sakania", "Kasenga"],
  },
  {
    name: "Lualaba",
    cities: ["Kolwezi", "Dilolo", "Kapanga", "Sandoa", "Lubudi", "Mutshatsha"],
  },
  {
    name: "Haut-Lomami",
    cities: ["Kamina", "Kabongo", "Kaniama", "Malemba-Nkulu", "Bukama"],
  },
  {
    name: "Tanganyika",
    cities: ["Kalemie", "Kongolo", "Moba", "Manono", "Kabalo", "Nyunzu"],
  },
  {
    name: "Lomami",
    cities: ["Kabinda", "Mwene-Ditu", "Ngandajika", "Lubao", "Kamiji", "Luilu"],
  },
  {
    name: "Kasaï-Oriental",
    cities: ["Mbuji-Mayi", "Tshilenge", "Miabi", "Kabeya-Kamwanga", "Katanda"],
  },
  {
    name: "Kasaï-Central",
    cities: ["Kananga", "Luebo", "Tshikapa", "Demba", "Dimbelenge", "Dibaya", "Kazumba"],
  },
  {
    name: "Kasaï",
    cities: ["Tshikapa", "Ilebo", "Luebo", "Mweka", "Dekese", "Kamonia"],
  },
  {
    name: "Sankuru",
    cities: ["Lodja", "Lusambo", "Kole", "Katako-Kombe", "Lomela", "Lubefu"],
  },
];

export const objectifsAcademiques = [
  "Licence (Bachelor)",
  "Master",
  "Doctorat (PhD)",
  "Formation professionnelle",
  "Stage académique",
  "Programme d'échange",
  "Recherche post-doctorale",
  "Certificat spécialisé",
  "Études de premier cycle (après Diplôme d'État)",
];

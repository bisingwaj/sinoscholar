# Design V2 // Section Pourquoi la Chine (Inspiration "Campus France")
Le design précédent a été rejeté. L'objectif est de s'inspirer d'une esthétique institutionnelle forte et dynamique (vert dominant avec motifs en diagonale type "pilules"), tout en proposant un enrichissement de contenu inédit.

## Phase 1 : Design Initial (Concepteur Principal)
**Proposition A** : Reproduire l'aspect "Campus France" avec un fond vert vif (`#50B370`), du texte blanc percutant en majuscules, et un motif d'arrière-plan avec des formes arrondies obliques (effet "pilule" en filigrane). L'argumentaire serait direct et axé sur les avantages concrets.
**Proposition B** : Un fond vert asymétrique qui englobe uniquement la partie haute de la section, tandis que les arguments sont sous forme de cartes flottantes blanches à cheval sur la limite du fond vert.

## Phase 2 : Brainstorming Multi-Agent (Revue de Design Structurée)

### 🕵️ Agent Sceptique / Challenger
> **Objections** : 
> - Sur l'image fournie de Campus France, le contraste est très fort. Si on met juste du texte et des cartes, ça fera vide. Le contenu de la version précédente ("Infrastructures", "Diplômes") était bien mais très classique. 
> - L'inspiration Campus France évoque le statut et la confiance gouvernementale. Le vert est très beau mais attention au contraste si on met du texte fin dessus.
> **Recommandation** : Adopter la Proposition A. Choisir un "Vert SinoScholar" vibrant. Le contenu a besoin de chiffres massifs et de déclarations institutionnelles ("LES BOURSES DESTINÉES..."). L'enrichissement doit comporter non seulement les avantages, mais la notion de "Service d'État" bilatéral.

### 🛡️ Agent Gardien des Contraintes
> **Contraintes de Performance & Style** : 
> - Les motifs en diagonale (arrondis/pilules) ne nécessitent pas de lourdes images PNG/SVG. Un `backgroundImage: repeating-linear-gradient` ou des `div` décoratives positionnées en absolute (avec `backdrop-filter: opacity` ou couleurs semi-transparentes) feront parfaitement l'affaire, garantissant une fluidité parfaite (60fps).
> - Le texte doit avoir un contraste WCAG valide contre le vert.
> **Recommandation** : Les formes obliques seront du pur CSS (`rotate(-15deg)`, `rounded-full`, `bg-white/10`). 

### 👥 Agent Avocat de l'Utilisateur
> **Friction Utilisateur** : 
> - L'utilisateur qui voit un fond vert uni massif risque d'être agressé visuellement si la zone est trop longue.
> - Le copywriting "Pourquoi la Chine" fait scolaire. Comme sur l'image Campus France, les étudiants veulent voir ce qui les concerne ("Bourses pour étudiants", etc.).
> **Recommandation** : 
> 1. Changer le grand titre pour "LES OPPORTUNITÉS D'ÉTUDES EN CHINE POUR LES CONGOLAIS", en reprenant exactement le style visuel de l'image de référence (Textes larges en majuscules sans-serif).
> 2. Définir le contenu en 3 blocs d'action clairs, présentés sur fond vert avec icônes blanches.

---

## Phase 3 : Arbitrage & Design Final (Intégrateur)
Le design final opte pour une "Campus France-ification" assumée, en l'adaptant à l'excellence SinoScholar.

### Structure du nouveau composant `WhyChina.tsx` :
La section devient un grand bloc `bg-[#5BB774]` (Vert institutionnel dynamique) totalement dépourvu de bordures, rempli de motifs subtils.

#### 1. Le Motif "Campus France" (Background CSS)
Création d'éléments absolus flottants en fond : des bandes épaisses arrondies (`rounded-[100px]`, obliques de -15 degrés), légèrement translucides (`bg-white/10`).

#### 2. La Typographie & Titraille
Un énorme titre blanc `LES OPPORTUNITÉS D'EXCELLENCE POUR LES ÉTUDIANTS CONGOLAIS EN CHINE`, surmontant une mention "Mis à jour pour la rentrée 2026" (reprenant le gimmick de l'image de référence).

#### 3. Enrichissement du Contenu (Les Piliers de l'Opportunité)
Au lieu de cartes surchargées, on utilisera une présentation aérée et digne d'un organisme officiel :
1. **ÉDUCATION MONDIALISÉE** : Accès direct aux institutions du Projet 985 & 211.
2. **ACCOMPAGNEMENT SÉCURISÉ** : Dès l'obtention du visa jusqu'à l'installation sur le campus.
3. **FINANCEMENT & BOURSES** : Les programmes bilatéraux prenant en charge la scolarité et la vie étudiante.

#### 4. Intégration Visuelle (Photos)
La référence montre une étudiante en photo de haute qualité qui casse avec la symétrie. Nous ajouterons un bloc image (ou un bloc rectangulaire contenant une photo propre de campus/étudiants) avec un bouton/badge en bas, exactement comme dans la maquette Campus France.

---

## 📋 Journal de Décisions

| Décision | Alternatives | Objections | Résolution |
|---|---|---|---|
| **Palette de Couleur** | Bleu d'origine vs Vert Campus France | Le bleu était trop formel. Le vert donne un effet portail gouvernemental moderne. | **Vert Vif (#5AB26C)** appliqué massivement en fond. |
| **Motif (Patterns)** | Fond Uni vs Diagonales Arrondies | Un fond vert uni est écrasant. Les diagonales font la signature Campus France. | **Diagonales "Pilules" translucides** en pur CSS. |
| **Enrichissement** | Maintenir le texte vs Refonte "Opportunité" | Les anciens piliers étaient froids. | **Refonte complète** du contenu, style grand titre en majuscules et images insérées dans le flux textuel. |

---
**Verdict de la Revue :** `APPROUVÉ` (Prêt pour implémentation sous réserve de validation utilisateur).

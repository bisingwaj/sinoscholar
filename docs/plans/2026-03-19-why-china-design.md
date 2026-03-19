# Design Actuel // Section Pourquoi la Chine
La section affiche actuellement un court texte explicatif institutionnel et 3 statistiques générales. C'est factuel mais cela manque de "storytelling" pour un candidat.

## Phase 1 : Design Initial (Concepteur Principal)
**Proposition A** : "La Chine Technologique" - Focus sur la suprématie en ingénierie, IA et infrastructures.
**Proposition B** : "La Coopération RDC-Chine" - Focus géopolitique sur l'axe bilatéral stratégique.
**Proposition C** : "Le Hub Étudiant" - Focus pragmatique sur la modernité des campus, la sécurité et le coût de la vie.

## Phase 2 : Brainstorming Multi-Agent (Revue de Design Structurée)

### 🕵️ Agent Sceptique / Challenger
> **Objections** : 
> - L'approche B (géopolitique) est trop éloignée des préoccupations directes d'un étudiant de 20 ans. Il cherche un ROI (retour sur investissement) pour son avenir.
> - L'approche A (Tech) est très clivante (quid des étudiants en commerce ou médecine ?).
> **Recommandation** : Fusionner A et C. Le discours doit répondre à "En quoi un diplôme chinois propulsera ma carrière au Congo ?".

### 🛡️ Agent Gardien des Contraintes
> **Contraintes de Performance & Style** : 
> - Si on enrichit le contenu, refusez toute idée d'intégrer des vidéos de présentation lourdes ou des cartes du globe en 3D (genre WebGL/Three.js). Le site DOIT rester hautement performant, institutionnel et sobre.
> **Recommandation** : S'en tenir à une grille asymétrique textuelle avec une iconographie vectorielle native extrêmement soignée.

### 👥 Agent Avocat de l'Utilisateur
> **Friction Utilisateur** : 
> - L'étudiant congolais qui lit "Pourquoi la Chine" a une peur profonde dont on ne parle pas : **la barrière de la langue**. 
> - Les statistiques c'est bien, mais ça manque de chaleur.
> **Recommandation** : Il faut qu'un des piliers de cette section s'attaque directement à l'angoisse de la langue (ex: mentionner des "Cursus 100% anglophones" ou "Immersion linguistique encadrée").

---

## Phase 3 : Arbitrage & Design Final (Intégrateur)
Le design final rejette l'approche encyclopédique pour adopter une rhétorique **orientée "Avantage Concurentiel D'Avenir"**.

### Structure du nouveau composant `WhyChina.tsx` :
La section passera des simples statistiques à une structure **Titre + 3 Piliers Argumentaires + Bandeau Statistique**.

#### 1. Titre & Introduction
- *Titre* : "La Chine : Premier Hub Mondial de Connaissances"
- *Sous-titre* : "Choisir la Chine, c'est choisir un environnement où l'innovation technologique rencontre une tradition académique millénaire, avec un accès direct aux secteurs de demain."

#### 2. Les Piliers (Feature Cards sobres)
1. **🌍 Diplômes d'Excellence Mondiale** : Rejoignez des universités présentes dans les plus grands classements mondiaux (QS, Times Higher Education).
2. **🚀 Infrastructures de Pointe** : Étudiez sur des campus hyper-modernes, avec un accès exclusif à des laboratoires de recherche de classe mondiale.
3. **🗣️ Intégration Sans Barrière** : Accédez à des milliers de cursus dispensés intégralement en anglais, ou bénéficiez d'une année de mise à niveau linguistique.

#### 3. Bandeau Chiffré (Le bas de la section)
On conserve les statistiques rassurantes qui étaient déjà là, disposées en ligne fine pour asseoir l'autorité institutionnelle.

---

## 📋 Journal de Décisions

| Décision | Alternatives | Objections | Résolution |
|---|---|---|---|
| **Axe Éditorial** | Géopolitique vs Tech vs Étudiant | La géopolitique ne convertit pas le candidat. | **Focus Étudiant** (Infrastructures, Valeur du diplôme). |
| **Frein Linguistique** | Ne pas en parler vs Exiger le Mandarin | L'étudiant a peur de devoir parler chinois de suite. | **Ajout explicite** d'un pilier sur les cursus anglophones. |
| **Vecteur Visuel** | Globe 3D interactif vs Grille Typographique | La 3D crée des risques de performance web. | **Grille Typographique institutionnelle** stricte avec icônes. |

---
**Verdict de la Revue :** `APPROUVÉ` (Prêt pour implémentation sous réserve de validation utilisateur).

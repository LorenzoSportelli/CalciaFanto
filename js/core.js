/**
 * FantaLega - Core Data & Auth System
 * Sistema account reale con localStorage
 */

// ============================================================
// DATI INIZIALI (seed data per nuovi utenti)
// ============================================================

const SEED_PLAYERS = [
  // Portieri
  { id: 1, name: "Sommer", team: "Inter", role: "P", value: 18, avgRating: 6.21, fantaAvg: 6.85, appearances: 14, goals: 0, assists: 0 },
  { id: 2, name: "Di Gregorio", team: "Juventus", role: "P", value: 12, avgRating: 6.05, fantaAvg: 6.30, appearances: 13, goals: 0, assists: 0 },
  { id: 3, name: "Meret", team: "Napoli", role: "P", value: 14, avgRating: 6.18, fantaAvg: 6.60, appearances: 14, goals: 0, assists: 0 },
  { id: 4, name: "Maignan", team: "Milan", role: "P", value: 22, avgRating: 6.45, fantaAvg: 7.10, appearances: 12, goals: 0, assists: 0 },
  { id: 5, name: "Carnesecchi", team: "Atalanta", role: "P", value: 16, avgRating: 6.30, fantaAvg: 6.95, appearances: 14, goals: 0, assists: 0 },
  { id: 6, name: "Provedel", team: "Lazio", role: "P", value: 13, avgRating: 6.10, fantaAvg: 6.50, appearances: 13, goals: 0, assists: 0 },
  // Difensori
  { id: 7, name: "Bastoni", team: "Inter", role: "D", value: 28, avgRating: 6.55, fantaAvg: 7.20, appearances: 14, goals: 3, assists: 4 },
  { id: 8, name: "Buongiorno", team: "Napoli", role: "D", value: 24, avgRating: 6.48, fantaAvg: 7.00, appearances: 14, goals: 2, assists: 1 },
  { id: 9, name: "Di Lorenzo", team: "Napoli", role: "D", value: 20, avgRating: 6.40, fantaAvg: 6.90, appearances: 13, goals: 1, assists: 3 },
  { id: 10, name: "Theo Hernandez", team: "Milan", role: "D", value: 30, avgRating: 6.60, fantaAvg: 7.50, appearances: 11, goals: 4, assists: 5 },
  { id: 11, name: "Gatti", team: "Juventus", role: "D", value: 18, avgRating: 6.35, fantaAvg: 6.80, appearances: 14, goals: 2, assists: 0 },
  { id: 12, name: "Pavard", team: "Inter", role: "D", value: 16, avgRating: 6.30, fantaAvg: 6.70, appearances: 12, goals: 1, assists: 2 },
  { id: 13, name: "Djimsiti", team: "Atalanta", role: "D", value: 15, avgRating: 6.25, fantaAvg: 6.65, appearances: 13, goals: 2, assists: 1 },
  { id: 14, name: "Ibanez", team: "Roma", role: "D", value: 12, avgRating: 6.10, fantaAvg: 6.40, appearances: 11, goals: 0, assists: 1 },
  { id: 15, name: "Milenkovic", team: "Fiorentina", role: "D", value: 14, avgRating: 6.20, fantaAvg: 6.60, appearances: 13, goals: 2, assists: 0 },
  { id: 16, name: "Dumfries", team: "Inter", role: "D", value: 22, avgRating: 6.50, fantaAvg: 7.10, appearances: 13, goals: 2, assists: 4 },
  // Centrocampisti
  { id: 17, name: "Barella", team: "Inter", role: "C", value: 38, avgRating: 6.90, fantaAvg: 7.80, appearances: 14, goals: 5, assists: 7 },
  { id: 18, name: "Koopmeiners", team: "Juventus", role: "C", value: 32, avgRating: 6.70, fantaAvg: 7.40, appearances: 12, goals: 4, assists: 5 },
  { id: 19, name: "Lobotka", team: "Napoli", role: "C", value: 26, avgRating: 6.80, fantaAvg: 7.20, appearances: 14, goals: 1, assists: 3 },
  { id: 20, name: "De Roon", team: "Atalanta", role: "C", value: 18, avgRating: 6.45, fantaAvg: 7.00, appearances: 14, goals: 3, assists: 2 },
  { id: 21, name: "Pellegrini", team: "Roma", role: "C", value: 22, avgRating: 6.50, fantaAvg: 7.10, appearances: 10, goals: 3, assists: 4 },
  { id: 22, name: "Anderson", team: "Lazio", role: "C", value: 20, avgRating: 6.60, fantaAvg: 7.30, appearances: 13, goals: 4, assists: 3 },
  { id: 23, name: "Reijnders", team: "Milan", role: "C", value: 28, avgRating: 6.75, fantaAvg: 7.50, appearances: 13, goals: 6, assists: 4 },
  { id: 24, name: "Fagioli", team: "Juventus", role: "C", value: 14, avgRating: 6.30, fantaAvg: 6.80, appearances: 11, goals: 1, assists: 2 },
  { id: 25, name: "Frattesi", team: "Inter", role: "C", value: 24, avgRating: 6.55, fantaAvg: 7.20, appearances: 14, goals: 5, assists: 2 },
  { id: 26, name: "Ederson", team: "Atalanta", role: "C", value: 20, avgRating: 6.65, fantaAvg: 7.35, appearances: 13, goals: 4, assists: 3 },
  // Attaccanti
  { id: 27, name: "Lautaro Martinez", team: "Inter", role: "A", value: 52, avgRating: 7.10, fantaAvg: 8.50, appearances: 13, goals: 12, assists: 5 },
  { id: 28, name: "Osimhen", team: "Napoli", role: "A", value: 55, avgRating: 7.20, fantaAvg: 8.80, appearances: 11, goals: 10, assists: 3 },
  { id: 29, name: "Vlahovic", team: "Juventus", role: "A", value: 42, avgRating: 6.85, fantaAvg: 8.00, appearances: 12, goals: 9, assists: 2 },
  { id: 30, name: "Lookman", team: "Atalanta", role: "A", value: 38, avgRating: 7.00, fantaAvg: 8.30, appearances: 13, goals: 11, assists: 6 },
  { id: 31, name: "Dybala", team: "Roma", role: "A", value: 35, avgRating: 6.90, fantaAvg: 8.10, appearances: 9, goals: 7, assists: 4 },
  { id: 32, name: "Zaccagni", team: "Lazio", role: "A", value: 28, avgRating: 6.75, fantaAvg: 7.80, appearances: 13, goals: 8, assists: 5 },
  { id: 33, name: "Pulisic", team: "Milan", role: "A", value: 32, avgRating: 6.80, fantaAvg: 7.90, appearances: 12, goals: 7, assists: 6 },
  { id: 34, name: "Thuram", team: "Inter", role: "A", value: 30, avgRating: 6.70, fantaAvg: 7.60, appearances: 14, goals: 8, assists: 4 },
  { id: 35, name: "Kean", team: "Fiorentina", role: "A", value: 26, avgRating: 6.65, fantaAvg: 7.70, appearances: 13, goals: 10, assists: 2 },
  { id: 36, name: "Dovbyk", team: "Roma", role: "A", value: 24, avgRating: 6.60, fantaAvg: 7.50, appearances: 12, goals: 8, assists: 1 },
  // Extra svincolati
  { id: 37, name: "Consigli", team: "Sassuolo", role: "P", value: 8, avgRating: 5.90, fantaAvg: 6.10, appearances: 14, goals: 0, assists: 0 },
  { id: 38, name: "Musso", team: "Atalanta", role: "P", value: 9, avgRating: 5.95, fantaAvg: 6.20, appearances: 5, goals: 0, assists: 0 },
  { id: 39, name: "Lazzari", team: "Lazio", role: "D", value: 10, avgRating: 6.00, fantaAvg: 6.30, appearances: 10, goals: 0, assists: 2 },
  { id: 40, name: "Hateboer", team: "Atalanta", role: "D", value: 8, avgRating: 5.95, fantaAvg: 6.20, appearances: 11, goals: 0, assists: 1 },
  { id: 41, name: "Vecino", team: "Lazio", role: "C", value: 7, avgRating: 5.90, fantaAvg: 6.10, appearances: 9, goals: 1, assists: 0 },
  { id: 42, name: "Nzola", team: "Fiorentina", role: "A", value: 6, avgRating: 5.80, fantaAvg: 6.00, appearances: 8, goals: 2, assists: 0 },
];

const SEED_FREE_AGENTS = [37, 38, 39, 40, 41, 42]; // IDs dei giocatori svincolati inizialmente

const LEAGUE_TEAMS_SEED = [
  { id: "team_cpu1", name: "Napoli United", owner: "CPU", points: 912, wins: 10, draws: 2, losses: 2, gf: 1264, ga: 1098 },
  { id: "team_cpu2", name: "Milan Magic", owner: "CPU", points: 876, wins: 9, draws: 2, losses: 3, gf: 1210, ga: 1110 },
  { id: "team_cpu3", name: "Inter Stellare", owner: "CPU", points: 821, wins: 8, draws: 2, losses: 4, gf: 1150, ga: 1105 },
  { id: "team_cpu4", name: "Real Marmotte", owner: "CPU", points: 798, wins: 7, draws: 3, losses: 4, gf: 1098, ga: 1075 },
  { id: "team_cpu5", name: "Juve Pazza", owner: "CPU", points: 765, wins: 7, draws: 2, losses: 5, gf: 1050, ga: 1010 },
  { id: "team_cpu6", name: "Roma Thunder", owner: "CPU", points: 720, wins: 6, draws: 2, losses: 6, gf: 998, ga: 1005 },
  { id: "team_cpu7", name: "Atalanta Fury", owner: "CPU", points: 698, wins: 5, draws: 4, losses: 5, gf: 970, ga: 980 },
];

const MATCHDAY_RESULTS_SEED = [
  { matchday: 11, opponent: "Roma Thunder", myPoints: 68, oppPoints: 68, result: "draw" },
  { matchday: 12, opponent: "Milan Magic", myPoints: 59, oppPoints: 74, result: "loss" },
  { matchday: 13, opponent: "Juve Pazza", myPoints: 82, oppPoints: 71, result: "win" },
  { matchday: 14, opponent: "Inter Stellare", myPoints: 78, oppPoints: 65, result: "win" },
];

// ============================================================
// AUTH SYSTEM
// ============================================================

const Auth = {
  // Registra un nuovo utente
  register(email, password, teamName, leagueCode) {
    const users = this._getUsers();
    
    // Validazioni
    if (!email || !email.includes("@") || !email.includes(".")) {
      return { success: false, error: "Email non valida." };
    }
    if (users[email]) {
      return { success: false, error: "Email già registrata. Prova ad accedere." };
    }
    if (password.length < 8) {
      return { success: false, error: "La password deve essere di almeno 8 caratteri." };
    }
    if (!teamName || teamName.trim().length < 2) {
      return { success: false, error: "Il nome squadra deve essere di almeno 2 caratteri." };
    }

    // Hash simulato (semplice, non sicuro per produzione reale)
    const passwordHash = this._simpleHash(password);
    const userId = "user_" + Date.now();
    const teamId = "team_" + userId;

    // Crea il profilo utente
    const user = {
      id: userId,
      email: email.toLowerCase().trim(),
      passwordHash,
      teamName: teamName.trim(),
      teamId,
      createdAt: new Date().toISOString(),
      leagueCode: leagueCode || null,
    };

    users[email.toLowerCase().trim()] = user;
    this._saveUsers(users);

    // Inizializza i dati della squadra
    this._initTeamData(userId, teamId, teamName.trim(), leagueCode);

    return { success: true, user };
  },

  // Login
  login(email, password) {
    const users = this._getUsers();
    const normalizedEmail = email.toLowerCase().trim();
    const user = users[normalizedEmail];

    if (!user) {
      return { success: false, error: "Nessun account trovato con questa email." };
    }

    const passwordHash = this._simpleHash(password);
    if (user.passwordHash !== passwordHash) {
      return { success: false, error: "Password errata. Riprova." };
    }

    // Salva sessione
    const session = {
      userId: user.id,
      email: user.email,
      teamName: user.teamName,
      teamId: user.teamId,
      loginAt: new Date().toISOString(),
    };
    localStorage.setItem("fl_session", JSON.stringify(session));

    return { success: true, user, session };
  },

  // Logout
  logout() {
    localStorage.removeItem("fl_session");
    window.location.href = "index.html";
  },

  // Controlla se loggato
  isLoggedIn() {
    return !!this.getSession();
  },

  // Ottieni sessione corrente
  getSession() {
    try {
      return JSON.parse(localStorage.getItem("fl_session"));
    } catch { return null; }
  },

  // Proteggi pagina (redirect se non loggato)
  requireAuth() {
    if (!this.isLoggedIn()) {
      window.location.href = "index.html";
      return null;
    }
    return this.getSession();
  },

  // Redirect se già loggato (per pagina login)
  redirectIfLoggedIn() {
    if (this.isLoggedIn()) {
      window.location.href = "dashboard.html";
    }
  },

  // Inizializza dati squadra per nuovo utente
  _initTeamData(userId, teamId, teamName, leagueCode) {
    // Assegna giocatori iniziali (draft automatico)
    const myRosterIds = [1, 7, 8, 10, 17, 19, 23, 27, 29, 30, 32, 3, 16, 25, 34]; // 15 giocatori base

    // Dati squadra
    const teamData = {
      id: teamId,
      userId,
      name: teamName,
      credits: 285,
      rosterIds: myRosterIds,
      formation: "4-3-3",
      lineup: {
        GK: 1,
        DEF1: 7, DEF2: 8, DEF3: 10, DEF4: 16,
        MID1: 17, MID2: 19, MID3: 23,
        ATT1: 27, ATT2: 29, ATT3: 30,
      },
      bench: [3, 25, 34, 32],
      captainId: 27,
      viceCaptainId: 17,
      currentMatchday: 15,
      points: 847,
      wins: 8, draws: 3, losses: 3,
      gf: 1050, ga: 983,
      results: [...MATCHDAY_RESULTS_SEED],
      offers: [],
    };

    localStorage.setItem(`fl_team_${userId}`, JSON.stringify(teamData));

    // Dati lega (condivisi)
    const leagueKey = "fl_league_default";
    let league = null;
    try { league = JSON.parse(localStorage.getItem(leagueKey)); } catch {}
    
    if (!league) {
      league = {
        id: "league_default",
        name: "Amici del Calcio",
        currentMatchday: 15,
        teams: [...LEAGUE_TEAMS_SEED],
        freeAgents: [...SEED_FREE_AGENTS],
        auctions: [],
        transfers: [],
        calendar: this._generateCalendar(),
      };
    }

    // Aggiungi la squadra del nuovo utente alla lega
    const existingIdx = league.teams.findIndex(t => t.id === teamId);
    if (existingIdx === -1) {
      league.teams.push({
        id: teamId,
        name: teamName,
        owner: userId,
        points: 847,
        wins: 8, draws: 3, losses: 3,
        gf: 1050, ga: 983,
      });
    }

    // Ordina per punti
    league.teams.sort((a, b) => b.points - a.points);
    localStorage.setItem(leagueKey, JSON.stringify(league));
  },

  _generateCalendar() {
    const teams = ["Napoli United", "Milan Magic", "Inter Stellare", "Real Marmotte", "Juve Pazza", "Roma Thunder", "Atalanta Fury", "La tua squadra"];
    const calendar = {};
    for (let gd = 1; gd <= 38; gd++) {
      calendar[gd] = [];
      for (let i = 0; i < 4; i++) {
        calendar[gd].push({
          home: teams[i * 2 % teams.length],
          away: teams[(i * 2 + 1) % teams.length],
          homePoints: gd <= 14 ? Math.floor(55 + Math.random() * 40) : null,
          awayPoints: gd <= 14 ? Math.floor(55 + Math.random() * 40) : null,
        });
      }
    }
    return calendar;
  },

  // Hash semplice per demo
  _simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash.toString(36) + str.length.toString(16);
  },

  _getUsers() {
    try { return JSON.parse(localStorage.getItem("fl_users")) || {}; } catch { return {}; }
  },

  _saveUsers(users) {
    localStorage.setItem("fl_users", JSON.stringify(users));
  },
};

// ============================================================
// DATA ACCESS
// ============================================================

const Store = {
  getTeam(userId) {
    try { return JSON.parse(localStorage.getItem(`fl_team_${userId}`)); } catch { return null; }
  },

  saveTeam(userId, teamData) {
    localStorage.setItem(`fl_team_${userId}`, JSON.stringify(teamData));
  },

  getLeague() {
    try { return JSON.parse(localStorage.getItem("fl_league_default")); } catch { return null; }
  },

  saveLeague(league) {
    localStorage.setItem("fl_league_default", JSON.stringify(league));
  },

  getPlayer(id) {
    return SEED_PLAYERS.find(p => p.id === id) || null;
  },

  getPlayers() {
    return SEED_PLAYERS;
  },

  getPlayersByIds(ids) {
    return ids.map(id => this.getPlayer(id)).filter(Boolean);
  },

  getFreeAgents(userId) {
    const league = this.getLeague();
    if (!league) return [];
    const team = this.getTeam(userId);
    const myIds = new Set(team?.rosterIds || []);
    // Svincolati = non in nessuna squadra della lega (escludiamo le squadre CPU che hanno giocatori fissi)
    const allPlayers = SEED_PLAYERS;
    return allPlayers.filter(p => !myIds.has(p.id) && league.freeAgents.includes(p.id));
  },
};

// ============================================================
// UI HELPERS
// ============================================================

const UI = {
  showToast(message, type = "success") {
    let toast = document.getElementById("fl-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "fl-toast";
      document.body.appendChild(toast);
    }
    toast.className = `fl-toast fl-toast-${type}`;
    toast.textContent = message;
    toast.classList.add("visible");
    setTimeout(() => toast.classList.remove("visible"), 3500);
  },

  setNavUser(session, team) {
    const creditsEl = document.querySelector(".user-credits");
    const avatarEl = document.querySelector(".user-avatar");
    const teamNameEl = document.querySelector(".nav-team-name");
    if (creditsEl && team) creditsEl.textContent = `💰 ${team.credits}`;
    if (avatarEl && session) {
      const initials = session.teamName.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
      avatarEl.textContent = initials;
      avatarEl.title = session.teamName;
    }
    if (teamNameEl && session) teamNameEl.textContent = session.teamName;
  },

  getRoleBadge(role) {
    const map = { P: "role-p", D: "role-d", C: "role-c", A: "role-a" };
    return `<span class="role-badge ${map[role] || ''}">${role}</span>`;
  },

  getStatusBadge(available) {
    return available
      ? `<span class="status-badge available">✓</span>`
      : `<span class="status-badge injured">⚕</span>`;
  },
};

window.Auth = Auth;
window.Store = Store;
window.UI = UI;
window.SEED_PLAYERS = SEED_PLAYERS;

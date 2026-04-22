/**
 * FantaLega - Main JavaScript
 * Gestione interattività del sito
 */
document.addEventListener("DOMContentLoaded", function () {
  // ========================================
  // NAVIGATION
  // ========================================

  const navToggle = document.querySelector(".nav-toggle")
  const navMenu = document.querySelector(".nav-menu")

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active")
    })
  }

  // ========================================
  // AUTH TABS (Login/Register)
  // ========================================

  const authTabs = document.querySelectorAll(".tab-btn")
  const authForms = document.querySelectorAll(".auth-form")

  authTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const targetTab = this.dataset.tab

      // Update tabs
      authTabs.forEach((t) => t.classList.remove("active"))
      this.classList.add("active")

      // Update forms
      authForms.forEach((form) => {
        form.classList.remove("active")
        if (form.id === `${targetTab}-form`) {
          form.classList.add("active")
        }
      })
    })
  })

  // Form submissions (demo - da collegare al backend)
  const loginForm = document.getElementById("login-form")
  const registerForm = document.getElementById("register-form")

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault()
      // Simulazione login
      const email = document.getElementById("login-email").value
      const password = document.getElementById("login-password").value

      console.log("Login attempt:", { email, password })

      // TODO: Implementare chiamata API per autenticazione
      // Per ora redirect alla dashboard
      window.location.href = "dashboard.html"
    })
  }

  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault()
      const teamName = document.getElementById("reg-name").value
      const email = document.getElementById("reg-email").value
      const password = document.getElementById("reg-password").value
      const confirmPassword = document.getElementById("reg-confirm").value
      const leagueCode = document.getElementById("reg-league").value

      // Validazione base
      if (password !== confirmPassword) {
        alert("Le password non coincidono!")
        return
      }

      if (password.length < 8) {
        alert("La password deve essere di almeno 8 caratteri!")
        return
      }

      console.log("Registration:", { teamName, email, leagueCode })

      // TODO: Implementare chiamata API per registrazione
      alert("Registrazione completata! Effettua il login.")
      authTabs[0].click() // Torna al login
    })
  }

  // ========================================
  // ROSTER FILTERS
  // ========================================

  const rosterFilterBtns = document.querySelectorAll(".filter-btn")
  const rosterRows = document.querySelectorAll(
    ".roster-table tbody tr[data-role]",
  )
  const rosterHeaders = document.querySelectorAll(
    ".roster-table tbody tr.role-header",
  )
  const playerSearch = document.getElementById("player-search")

  function filterRoster(role, searchTerm = "") {
    const search = searchTerm.toLowerCase()

    rosterRows.forEach((row) => {
      const rowRole = row.dataset.role
      const playerName =
        row.querySelector(".player-name")?.textContent.toLowerCase() || ""

      const matchesRole = role === "all" || rowRole === role
      const matchesSearch = playerName.includes(search)

      row.style.display = matchesRole && matchesSearch ? "" : "none"
    })

    // Show/hide role headers based on visible players
    rosterHeaders.forEach((header) => {
      const nextRows = []
      let sibling = header.nextElementSibling

      while (sibling && !sibling.classList.contains("role-header")) {
        if (sibling.dataset.role) {
          nextRows.push(sibling)
        }
        sibling = sibling.nextElementSibling
      }

      const hasVisibleRows = nextRows.some(
        (row) => row.style.display !== "none",
      )
      header.style.display = hasVisibleRows ? "" : "none"
    })
  }

  rosterFilterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      rosterFilterBtns.forEach((b) => b.classList.remove("active"))
      this.classList.add("active")

      const role = this.dataset.role
      const searchTerm = playerSearch?.value || ""
      filterRoster(role, searchTerm)
    })
  })

  if (playerSearch) {
    playerSearch.addEventListener("input", function () {
      const activeFilter = document.querySelector(".filter-btn.active")
      const role = activeFilter?.dataset.role || "all"
      filterRoster(role, this.value)
    })
  }

  // ========================================
  // FORMATION PAGE
  // ========================================

  const formationSelect = document.getElementById("formation-select")
  const saveFormationBtn = document.getElementById("save-formation")
  const resetFormationBtn = document.getElementById("reset-formation")
  const availablePlayersList = document.getElementById("available-players")
  const roleFilters = document.querySelectorAll(".role-filter")
  const panelSearch = document.querySelector(".panel-search")

  // Formation module configuration
  const formations = {
    "3-4-3": { D: 3, C: 4, A: 3 },
    "3-5-2": { D: 3, C: 5, A: 2 },
    "4-3-3": { D: 4, C: 3, A: 3 },
    "4-4-2": { D: 4, C: 4, A: 2 },
    "4-5-1": { D: 4, C: 5, A: 1 },
    "5-3-2": { D: 5, C: 3, A: 2 },
    "5-4-1": { D: 5, C: 4, A: 1 },
  }

  if (formationSelect) {
    formationSelect.addEventListener("change", function () {
      const formation = this.value
      console.log("Formation changed to:", formation)
      // TODO: Aggiornare dinamicamente il campo
    })
  }

  // Remove player from slot
  document.querySelectorAll(".remove-player").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation()
      const slot = this.closest(".player-slot")
      const slotContent = slot.querySelector(".slot-content")
      const role = slot.dataset.role

      // Reset slot to empty
      slotContent.classList.remove("filled")
      slotContent.classList.add("empty")
      slotContent.innerHTML = `
                <span class="slot-placeholder">+</span>
                <span class="slot-role">${getRoleLabel(role)}</span>
            `
    })
  })

  function getRoleLabel(role) {
    const labels = { P: "POR", D: "DIF", C: "CEN", A: "ATT" }
    return labels[role] || role
  }

  // Filter available players in panel
  roleFilters.forEach((filter) => {
    filter.addEventListener("click", function () {
      roleFilters.forEach((f) => f.classList.remove("active"))
      this.classList.add("active")

      filterAvailablePlayers(this.dataset.role, panelSearch?.value || "")
    })
  })

  if (panelSearch) {
    panelSearch.addEventListener("input", function () {
      const activeFilter = document.querySelector(".role-filter.active")
      const role = activeFilter?.dataset.role || "all"
      filterAvailablePlayers(role, this.value)
    })
  }

  function filterAvailablePlayers(role, searchTerm) {
    const players = document.querySelectorAll(".available-player")
    const search = searchTerm.toLowerCase()

    players.forEach((player) => {
      const playerRole = player.dataset.role
      const playerName = player.dataset.name?.toLowerCase() || ""

      const matchesRole = role === "all" || playerRole === role
      const matchesSearch = playerName.includes(search)

      player.style.display = matchesRole && matchesSearch ? "" : "none"
    })
  }

  // Save formation
  if (saveFormationBtn) {
    saveFormationBtn.addEventListener("click", function () {
      // Collect formation data
      const formationData = {
        module: formationSelect?.value,
        players: [],
        bench: [],
      }

      // TODO: Raccogliere dati giocatori schierati
      console.log("Saving formation:", formationData)

      // TODO: Implementare chiamata API
      alert("Formazione salvata con successo!")
    })
  }

  // Reset formation
  if (resetFormationBtn) {
    resetFormationBtn.addEventListener("click", function () {
      if (confirm("Sei sicuro di voler azzerare la formazione?")) {
        // TODO: Reset all slots
        console.log("Formation reset")
      }
    })
  }

  // ========================================
  // MATCHDAY NAVIGATION
  // ========================================

  const prevMatchdayBtn = document.getElementById("prev-matchday")
  const nextMatchdayBtn = document.getElementById("next-matchday")
  const matchdaySelect = document.getElementById("matchday-select")

  if (prevMatchdayBtn && matchdaySelect) {
    prevMatchdayBtn.addEventListener("click", function () {
      const currentIndex = matchdaySelect.selectedIndex
      if (currentIndex > 0) {
        matchdaySelect.selectedIndex = currentIndex - 1
        matchdaySelect.dispatchEvent(new Event("change"))
      }
    })
  }

  if (nextMatchdayBtn && matchdaySelect) {
    nextMatchdayBtn.addEventListener("click", function () {
      const currentIndex = matchdaySelect.selectedIndex
      if (currentIndex < matchdaySelect.options.length - 1) {
        matchdaySelect.selectedIndex = currentIndex + 1
        matchdaySelect.dispatchEvent(new Event("change"))
      }
    })
  }

  if (matchdaySelect) {
    matchdaySelect.addEventListener("change", function () {
      const selectedMatchday = this.value
      console.log("Loading matchday:", selectedMatchday)
      // TODO: Caricare dati della giornata selezionata via API
    })
  }

  // ========================================
  // LEADERBOARD TABS
  // ========================================

  const leaderboardTabs = document.querySelectorAll(".leaderboard-tab")

  leaderboardTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      leaderboardTabs.forEach((t) => t.classList.remove("active"))
      this.classList.add("active")

      const view = this.dataset.view
      console.log("Leaderboard view:", view)
      // TODO: Aggiornare visualizzazione classifica
    })
  })

  // ========================================
  // MARKET TABS
  // ========================================

  const marketTabs = document.querySelectorAll(".market-tab")
  const marketSections = document.querySelectorAll(".market-section")

  marketTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const targetTab = this.dataset.tab

      marketTabs.forEach((t) => t.classList.remove("active"))
      this.classList.add("active")

      marketSections.forEach((section) => {
        section.classList.remove("active")
        if (section.id === targetTab) {
          section.classList.add("active")
        }
      })
    })
  })

  // Market search and filters
  const marketSearch = document.getElementById("market-search")
  const roleFilter = document.getElementById("role-filter")
  const teamFilter = document.getElementById("team-filter")
  const priceFilter = document.getElementById("price-filter")

  function filterMarketPlayers() {
    const searchTerm = marketSearch?.value.toLowerCase() || ""
    const role = roleFilter?.value || ""
    const team = teamFilter?.value || ""
    const price = priceFilter?.value || ""

    const playerCards = document.querySelectorAll(".market-player-card")

    playerCards.forEach((card) => {
      const playerName =
        card.querySelector(".player-name")?.textContent.toLowerCase() || ""
      const playerTeam = card.querySelector(".player-team")?.textContent || ""
      const playerRole = card.querySelector(".role-badge")?.textContent || ""
      const playerPrice =
        parseInt(
          card
            .querySelector(".player-value")
            ?.textContent.replace(/[^0-9]/g, ""),
        ) || 0

      let matchesSearch = playerName.includes(searchTerm)
      let matchesRole = !role || playerRole === role
      let matchesTeam = !team || playerTeam === team
      let matchesPrice = true

      if (price) {
        const [min, max] = price
          .split("-")
          .map((p) => (p === "+" ? Infinity : parseInt(p)))
        matchesPrice =
          playerPrice >= (min || 0) && playerPrice <= (max || Infinity)
      }

      card.style.display =
        matchesSearch && matchesRole && matchesTeam && matchesPrice
          ? ""
          : "none"
    })
  }

  ;[marketSearch, roleFilter, teamFilter, priceFilter].forEach((el) => {
    if (el) {
      el.addEventListener("input", filterMarketPlayers)
      el.addEventListener("change", filterMarketPlayers)
    }
  })

  // ========================================
  // MODALS
  // ========================================

  const modals = document.querySelectorAll(".modal")
  const modalCloseBtns = document.querySelectorAll(
    ".modal-close, .modal-cancel",
  )

  // Open offer modal
  document
    .querySelectorAll(".market-player-card .btn-primary")
    .forEach((btn) => {
      btn.addEventListener("click", function () {
        const offerModal = document.getElementById("offer-modal")
        if (offerModal) {
          offerModal.classList.add("active")
        }
      })
    })

  // Close modals
  modalCloseBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const modal = this.closest(".modal")
      if (modal) {
        modal.classList.remove("active")
      }
    })
  })

  // Close modal on backdrop click
  modals.forEach((modal) => {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        modal.classList.remove("active")
      }
    })
  })

  // Close modal on Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      modals.forEach((modal) => modal.classList.remove("active"))
    }
  })

  // ========================================
  // UTILITY FUNCTIONS
  // ========================================

  // Format number with thousand separators
  function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }

  // Format date
  function formatDate(date) {
    const options = { day: "numeric", month: "short" }
    return new Date(date).toLocaleDateString("it-IT", options)
  }

  // Debounce function for search inputs
  function debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  // ========================================
  // DATA STORAGE (LocalStorage per demo)
  // ========================================

  const Storage = {
    get(key) {
      try {
        return JSON.parse(localStorage.getItem(key))
      } catch {
        return null
      }
    },

    set(key, value) {
      localStorage.setItem(key, JSON.stringify(value))
    },

    remove(key) {
      localStorage.removeItem(key)
    },
  }

  // ========================================
  // API HELPERS (da implementare)
  // ========================================

  const API = {
    baseUrl: "/api", // Da configurare

    async fetch(endpoint, options = {}) {
      try {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
          headers: {
            "Content-Type": "application/json",
            // TODO: Aggiungere token autenticazione
          },
          ...options,
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        return await response.json()
      } catch (error) {
        console.error("API Error:", error)
        throw error
      }
    },

    // User endpoints
    login(email, password) {
      return this.fetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      })
    },

    register(data) {
      return this.fetch("/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
      })
    },

    // Team endpoints
    getRoster() {
      return this.fetch("/team/roster")
    },

    saveFormation(formation) {
      return this.fetch("/team/formation", {
        method: "POST",
        body: JSON.stringify(formation),
      })
    },

    // League endpoints
    getLeaderboard() {
      return this.fetch("/league/leaderboard")
    },

    getCalendar(matchday) {
      return this.fetch(`/league/calendar/${matchday}`)
    },

    // Market endpoints
    getAvailablePlayers(filters) {
      const params = new URLSearchParams(filters)
      return this.fetch(`/market/players?${params}`)
    },

    makeOffer(playerId, amount) {
      return this.fetch("/market/offer", {
        method: "POST",
        body: JSON.stringify({ playerId, amount }),
      })
    },
  }

  // Esporta API per uso globale
  window.FantaLegaAPI = API

  console.log("FantaLega initialized")
})

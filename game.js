// Game Logic - Caça-Emoji do Edgar

class EmojiHuntGame {
    constructor() {
        this.level = 1;
        this.score = 0;
        this.timeLeft = 12;
        this.timer = null;
        this.gameActive = false;
        this.currentRound = 0;

        // Emojis por categoria
        this.animals = ['🦁', '🐯', '🐘', '🦒', '🐵', '🐗', '🐧', '🦊', '🐻', '🐼'];
        this.nature = ['🌞', '🌿', '⭐', '🌈', '🌊', '🌺', '🍄', '🌻', '🌵', '🌳'];
        this.babies = ['🦁👶', '🐯👶', '🐘👶', '🦒👶', '🐵👶', '🦊👶', '🐻👶', '🐼👶'];

        // Tipos de busca
        this.searchTypes = [
            { name: 'Leãozinho', emoji: '🦁👶', category: 'babies' },
            { name: 'Bebê', emoji: '👶', category: 'babies' },
            { name: 'Animal Diferente', category: 'animals' },
            { name: 'Elemento Diferente', category: 'nature' }
        ];

        this.currentSearchType = this.searchTypes[0];

        this.initializeElements();
        this.bindEvents();
        this.showStartScreen();
    }

    initializeElements() {
        // Get DOM elements
        this.levelElement = document.getElementById('level');
        this.scoreElement = document.getElementById('score');
        this.timerElement = document.getElementById('timer');
        this.gameGrid = document.getElementById('gameGrid');
        this.messageElement = document.getElementById('message');
        this.gameOverScreen = document.getElementById('gameOver');
        this.startScreen = document.getElementById('startScreen');
        this.finalScoreElement = document.getElementById('finalScore');
        this.finalLevelElement = document.getElementById('finalLevel');
        this.finalMessageElement = document.getElementById('finalMessage');
        this.confettiContainer = document.getElementById('confettiContainer');
    }

    bindEvents() {
        document.getElementById('startGame').addEventListener('click', () => this.startGame());
        document.getElementById('playAgain').addEventListener('click', () => this.restartGame());
        document.getElementById('exitGame').addEventListener('click', () => this.exitGame());
    }

    showStartScreen() {
        this.startScreen.classList.remove('hidden');
        this.gameOverScreen.classList.add('hidden');
    }

    hideStartScreen() {
        this.startScreen.classList.add('hidden');
    }

    showGameOver() {
        this.finalScoreElement.textContent = this.score;
        this.finalLevelElement.textContent = this.level;
        this.gameOverScreen.classList.remove('hidden');
    }

    hideGameOver() {
        this.gameOverScreen.classList.add('hidden');
    }

    startGame() {
        this.hideStartScreen();
        this.hideGameOver();
        this.resetGame();
        this.gameActive = true;
        this.generateGrid();
        this.startTimer();
    }

    restartGame() {
        this.startGame();
    }

    exitGame() {
        if (confirm('Tem certeza que deseja sair do jogo?')) {
            window.location.href = 'index.html';
        }
    }

    // Fisher-Yates shuffle algorithm
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Physics-based bouncing emojis
    animateShuffle(elements, emojis) {
        // Immediate shuffle
        this.shuffleArray(emojis);

        // Assign new emojis to elements
        elements.forEach((element, index) => {
            element.textContent = emojis[index];
            element.dataset.index = index;
        });

        // Add physics properties
        this.addPhysicsToEmojis(elements);
    }

    addPhysicsToEmojis(elements) {
        // Clear any existing physics
        if (this.physicsInterval) {
            clearInterval(this.physicsInterval);
        }

        // Physics properties for each emoji
        const physicsData = elements.map(element => ({
            element: element,
            x: parseFloat(element.style.left) || Math.random() * 80,
            y: parseFloat(element.style.top) || Math.random() * 80,
            vx: (Math.random() - 0.5) * 2, // velocity x
            vy: (Math.random() - 0.5) * 2, // velocity y
            size: 60 // emoji size in pixels
        }));

        // Start physics simulation
        this.physicsInterval = setInterval(() => {
            physicsData.forEach(data => {
                // Update position
                data.x += data.vx;
                data.y += data.vy;

                // Boundary collision - bounce off edges
                const gridRect = this.gameGrid.getBoundingClientRect();
                const maxX = 90; // percentage
                const maxY = 90; // percentage

                // Horizontal bounce
                if (data.x <= 0 || data.x >= maxX) {
                    data.vx *= -1;
                    data.x = Math.max(0, Math.min(maxX, data.x));
                }

                // Vertical bounce
                if (data.y <= 0 || data.y >= maxY) {
                    data.vy *= -1;
                    data.y = Math.max(0, Math.min(maxY, data.y));
                }

                // Apply position with smooth transition
                data.element.style.position = 'absolute';
                data.element.style.left = data.x + '%';
                data.element.style.top = data.y + '%';
                data.element.style.transition = 'left 0.1s linear, top 0.1s linear';
            });
        }, 50); // 50ms update rate

        // Store physics data for cleanup
        this.currentPhysicsData = physicsData;
    }

    stopPhysics() {
        if (this.physicsInterval) {
            clearInterval(this.physicsInterval);
            this.physicsInterval = null;
        }

        // Reset emoji positions
        if (this.currentPhysicsData) {
            this.currentPhysicsData.forEach(data => {
                data.element.style.position = '';
                data.element.style.left = '';
                data.element.style.top = '';
                data.element.style.transition = '';
            });
            this.currentPhysicsData = null;
        }
    }

    resetGame() {
        this.level = 1;
        this.score = 0;
        this.timeLeft = 12;

        // Stop any running physics
        this.stopPhysics();

        this.updateDisplay();
        this.clearMessage();
    }

    generateGrid() {
        // Clear previous grid
        this.gameGrid.innerHTML = '';

        // Rotate search type each round
        this.currentSearchType = this.searchTypes[this.currentRound % this.searchTypes.length];
        this.currentRound++;

        // Calculate grid size based on level
        let gridSize;
        if (this.level <= 2) {
            gridSize = 3; // 3x3 grid for levels 1-2
        } else if (this.level <= 4) {
            gridSize = 4; // 4x4 grid for levels 3-4
        } else {
            gridSize = 5; // 5x5 grid for level 5+
        }

        const totalEmojis = gridSize * gridSize;

        // Select base emojis from appropriate category
        let baseEmojis;
        let specialEmoji;

        switch (this.currentSearchType.category) {
            case 'animals':
                baseEmojis = [...this.animals];
                // Remove one animal to be the special one
                const randomAnimalIndex = Math.floor(Math.random() * baseEmojis.length);
                specialEmoji = baseEmojis.splice(randomAnimalIndex, 1)[0];
                break;
            case 'nature':
                baseEmojis = [...this.nature];
                const randomNatureIndex = Math.floor(Math.random() * baseEmojis.length);
                specialEmoji = baseEmojis.splice(randomNatureIndex, 1)[0];
                break;
            case 'babies':
                baseEmojis = [...this.animals]; // Base animals
                specialEmoji = this.currentSearchType.emoji || '👶';
                break;
        }

        // Select random base emoji
        const baseEmoji = baseEmojis[Math.floor(Math.random() * baseEmojis.length)];

        // Create array with base emojis
        const gridArray = Array(totalEmojis).fill(baseEmoji);

        // Place special emoji in random position
        const specialPosition = Math.floor(Math.random() * totalEmojis);
        gridArray[specialPosition] = specialEmoji;

        // Create grid elements first
        const emojiElements = [];
        gridArray.forEach((emoji, index) => {
            const emojiElement = document.createElement('div');
            emojiElement.className = 'grid-emoji';
            emojiElement.textContent = emoji;
            emojiElement.dataset.originalIndex = index;
            emojiElement.addEventListener('click', () => this.handleEmojiClick(emoji, index, emojiElement, specialEmoji));
            emojiElements.push(emojiElement);
            this.gameGrid.appendChild(emojiElement);
        });

        // Animate shuffle similar to memory games
        this.animateShuffle(emojiElements, gridArray);

        // Update instruction
        this.updateInstruction();

        // Update grid columns
        this.gameGrid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    }

    handleEmojiClick(emoji, index, element, specialEmoji) {
        if (!this.gameActive) return;

        // Get the actual emoji displayed in the element
        const displayedEmoji = element.textContent;

        if (displayedEmoji === specialEmoji) {
            // Correct answer
            this.handleCorrectAnswer(element);
        } else {
            // Wrong answer
            this.handleWrongAnswer(element);
        }
    }

    handleCorrectAnswer(element) {
        // Visual feedback
        element.classList.add('correct');

        // Show success message with current search type
        const successMessages = [
            '🎉 Hakuna Matata! Você encontrou o leãozinho do Edgar!',
            '🌟 Muito bem! Você achou o bebê especial!',
            '🦁 Excelente! Você encontrou o animal diferente!',
            '🌿 Parabéns! Você achou o elemento diferente!'
        ];

        const messageIndex = this.searchTypes.findIndex(type => type === this.currentSearchType);
        this.showMessage(successMessages[messageIndex] || successMessages[0]);

        // Add score (more points for higher levels and rounds)
        const pointsEarned = this.level * 10 + this.currentRound * 5;
        this.score += pointsEarned;
        this.updateDisplay();

        // Create confetti effect
        this.createConfetti();

        // Level up every 2 rounds
        if (this.currentRound % 2 === 0) {
            this.level++;
        }

        // Stop current timer
        clearInterval(this.timer);

        // Move to next level after delay
        setTimeout(() => {
            this.clearMessage();
            this.generateGrid();
            this.adjustDifficulty();
            this.startTimer();
        }, 1500);
    }

    handleWrongAnswer(element) {
        // Visual feedback
        element.classList.add('wrong');

        // Show game over
        this.endGame(false);
    }

    updateInstruction() {
        // Update the instruction message
        const instructionElement = document.getElementById('instruction');
        if (instructionElement) {
            instructionElement.textContent = `Encontre: ${this.currentSearchType.name}`;
        }
    }

    adjustDifficulty() {
        // More aggressive difficulty increase
        if (this.level <= 2) {
            this.timeLeft = 12; // Levels 1-2: 12 seconds
        } else if (this.level <= 4) {
            this.timeLeft = 10; // Levels 3-4: 10 seconds
        } else if (this.level <= 6) {
            this.timeLeft = 8;  // Levels 5-6: 8 seconds
        } else if (this.level <= 8) {
            this.timeLeft = 6;  // Levels 7-8: 6 seconds
        } else {
            this.timeLeft = 5;  // Level 9+: 5 seconds
        }
    }

    startTimer() {
        this.updateTimerDisplay();

        this.timer = setInterval(() => {
            this.timeLeft--;
            this.updateTimerDisplay();

            if (this.timeLeft <= 0) {
                this.endGame(true);
            }
        }, 1000);
    }

    updateTimerDisplay() {
        this.timerElement.textContent = this.timeLeft;

        // Change color when time is low
        if (this.timeLeft <= 3) {
            this.timerElement.style.color = '#FF6B6B';
        } else {
            this.timerElement.style.color = '#FFD700';
        }
    }

    endGame(timeUp) {
        this.gameActive = false;
        clearInterval(this.timer);

        // Stop physics
        this.stopPhysics();

        if (timeUp) {
            this.showMessage('⏰ Tempo esgotado! O leãozinho fugiu!');
        }

        setTimeout(() => {
            this.showGameOver();
        }, 1500);
    }

    showMessage(text) {
        this.messageElement.textContent = text;
        this.messageElement.classList.add('show');
    }

    clearMessage() {
        this.messageElement.classList.remove('show');
    }

    updateDisplay() {
        this.levelElement.textContent = this.level;
        this.scoreElement.textContent = this.score;
        this.timerElement.textContent = this.timeLeft;
    }

    createConfetti() {
        // Create 30 confetti pieces
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';

                // Random confetti type
                if (Math.random() > 0.7) {
                    confetti.classList.add('star');
                } else if (Math.random() > 0.4) {
                    confetti.classList.add('paw');
                }

                // Random position and colors
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.backgroundColor = ['#FFD700', '#8B4513', '#FF6B6B', '#4ECDC4'][Math.floor(Math.random() * 4)];

                // Random size
                const size = 10 + Math.random() * 15;
                confetti.style.width = size + 'px';
                confetti.style.height = size + 'px';

                // Random animation duration
                confetti.style.animationDuration = (3 + Math.random() * 4) + 's';

                this.confettiContainer.appendChild(confetti);

                // Remove confetti after animation
                setTimeout(() => {
                    if (confetti.parentNode) {
                        confetti.parentNode.removeChild(confetti);
                    }
                }, 5000);
            }, i * 50);
        }
    }
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    const game = new EmojiHuntGame();

    // Prevent zoom on mobile double tap
    document.addEventListener('touchstart', (e) => {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    }, { passive: false });

    // Handle window resize
    window.addEventListener('resize', () => {
        // Adjust game elements if needed
    });
});
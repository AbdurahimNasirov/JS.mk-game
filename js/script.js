const selectedFighters = {}
fighters.forEach(fighter => {
  const li = document.createElement('li')
  li.classList.add('selection-fighters-list-item')
  li.insertAdjacentHTML('beforeend',
    `<img src="${fighter.images.avatar}" class="selection-fighters-list-item-fighter" alt="fighter-${fighter.name}">
    `
  )
  li.addEventListener('click', () => {
    const warriors = document.querySelectorAll('.selection-fighters-list-item')
    warriors.forEach(item => {
      item.classList.remove('user-select-hover')
    })
    fightBtn.innerHTML = 'Fight with'
    li.classList.add('user-select-hover')
    selectedFighterUser.innerHTML = ` <img src="${fighter.images.stand}" alt="">`
    fightBtn.innerHTML += ` ${fighter.name}`
    selectedFighters.user = fighter
  })
  fightersList.append(li)
})

fightBtn.addEventListener('click', (e) => {
  if (selectedFighters.user) {
    closefightersList.classList.add('active')
    const randomFighter = getRandomImage(fighters)
    selectedFighterRandom.innerHTML = `<img src="${randomFighter.images.stand}" alt="">`
    selectedFighters.random = randomFighter
    let i = 3
    const interval = setInterval(() => {
      i -= 1
      closefightersList.innerHTML = i
      if (i === 0) {
        clearInterval(interval)
        selectionAuth.classList.remove('active')
        fightArena.classList.add('active')
        fightRing.children[0].attributes.src.value = selectedFighters.user.images.stand
        fightRing.children[1].attributes.src.value = selectedFighters.random.images.stand
        userFighterName.innerHTML = selectedFighters.user.name
        randomFighterName.innerHTML = selectedFighters.random.name
        setTimeout(() => {
          fightImg.classList.remove('active')
          attacingAndDefence()
          attackingInfo.classList.add('active')
        }, 2000)
      }
    }, 1000)
  }
})
const attackingInfoGroup = {
  nowAttacking: 'random',
  user: {
    attack: null,
    defence: null,
    hp: 100
  },
  random: {
    attack: null,
    defence: null,
    hp: 100
  }
}

function attacingAndDefence() {
  infoAttack.forEach(infoItem => {
    infoItem.classList.remove('selected-info')
    infoItem.addEventListener('click', (e) => {
      infoAttack.forEach(item => item.classList.remove('selected-info'))
      infoItem.classList.add('selected-info')
      attackingInfoGroup.user.attack = e.target.innerHTML
    })
  })
  infoDefence.forEach(infoItem => {
    infoItem.classList.remove('selected-info')
    infoItem.addEventListener('click', (e) => {
      infoDefence.forEach(item => item.classList.remove('selected-info'))
      infoItem.classList.add('selected-info')
      attackingInfoGroup.user.defence = e.target.innerHTML
    })
  })
  attackingBtn.addEventListener('click', () => {
    attackingInfoGroup.random.attack = getRandomImage(infoAttack).innerHTML
    attackingInfoGroup.random.defence = getRandomImage(infoDefence).innerHTML
    attackingInfo.classList.remove('active')
    attacking()
  })
}
function attacking() {
  if (attackingInfoGroup.nowAttacking === 'random') {
    setTimeout(() => {
      fighter1.attributes.src.value = getRandomImage(selectedFighters.user.images.attack)
    }, 50);
    fighter1.style.left = '68%'
    fighter1.style.top = '40px'
    fighter1.style.transform = 'scale(1.2)'
    setTimeout(() => {
      if(attackingInfoGroup.random.hp) {
        fighter2.attributes.src.value = selectedFighters.random.images.stand
      }
      fighter1.style.left = '10px'
      fighter1.style.top = '0'
      fighter1.style.transform = 'scale(1)'
    }, 750)
    setTimeout(() => {
      attackingInfoGroup.nowAttacking = 'user'
      randomAttack()
    }, 1000)
    if (attackingInfoGroup.random.defence === attackingInfoGroup.user.attack) {
      setTimeout(() => {
        fighter2.attributes.src.value = selectedFighters.random.images.block
      }, 350);
      fighter2.style.height = '60%'
      fighter2.style.width = '15%'
      setTimeout(() => {
        fighter2.attributes.src.value = selectedFighters.random.images.stand
        fighter2.style.width = '20%'
        fighter2.style.height = '75%'
      }, 850);
    } else {
      if (selectedFighters.random.name !== 'SMOKE') {
        setTimeout(() => {
          fighter2.attributes.src.value = selectedFighters.random.images.gothit
          attackingInfoGroup.random.hp = attackingInfoGroup.random.hp > 21 ? attackingInfoGroup.random.hp - 21 : attackingInfoGroup.random.hp - attackingInfoGroup.random.hp
          randomProgress.style.width = `${attackingInfoGroup.random.hp}%`
        }, 350);
        fighter2.style.height = '60%'
        fighter2.style.width = '15%'
        setTimeout(() => {
          if (attackingInfoGroup.random.hp) {
            fighter2.attributes.src.value = selectedFighters.random.images.stand
          } else {
            console.log('user is attacking', attackingInfoGroup.random.hp)
            fighter2.attributes.src.value = selectedFighters.random.images.lose
            fighter1.attributes.src.value = selectedFighters.user.images.win
            console.log(attackingInfo)
            attackingInfo.classList.remove('active')
            restartBtn.classList.add('active')
          }
          fighter2.style.width = '20%'
          fighter2.style.height = '75%'
        }, 850);
      } else {
        setTimeout(() => {
          fighter2.attributes.src.value = selectedFighters.random.images.gothit
          attackingInfoGroup.random.hp = attackingInfoGroup.random.hp > 21 ? attackingInfoGroup.random.hp - 21 : attackingInfoGroup.random.hp - attackingInfoGroup.random.hp
          randomProgress.style.width = `${attackingInfoGroup.random.hp}%`
        }, 350);
        setTimeout(() => {
          if (attackingInfoGroup.random.hp) {
            fighter2.attributes.src.value = selectedFighters.random.images.stand
          } else {
            console.log('user is attacking', attackingInfoGroup.random.hp)
            fighter2.attributes.src.value = selectedFighters.random.images.lose
            fighter1.attributes.src.value = selectedFighters.user.images.win
            console.log(attackingInfo)
            attackingInfo.classList.remove('active')
            restartBtn.classList.add('active')
          }
        }, 850);
      }
    }
  }
}

function randomAttack() {
  setTimeout(() => {
    fighter2.attributes.src.value = getRandomImage(selectedFighters.random.images.attack)
  }, 50);
  fighter2.style.right = '68%'
  setTimeout(() => {
    if(attackingInfoGroup.random.hp) {
      fighter2.attributes.src.value = selectedFighters.random.images.stand
    }else {
      fighter2.attributes.src.value = selectedFighters.random.images.lose
    }
    fighter2.style.right = '10px'
  }, 750)
  setTimeout(() => {
    if (!attackingInfoGroup.user.hp || !attackingInfoGroup.random.hp) {
      attackingInfo.classList.remove('active')
      attackingInfoGroup.nowAttacking = 'random'
    } else {
      attackingInfo.classList.add('active')
      attackingInfoGroup.nowAttacking = 'random'
    }
  }, 1000)
  console.log(attackingInfoGroup)
  if (attackingInfoGroup.user.defence === attackingInfoGroup.user.attack) {
    setTimeout(() => {
      fighter1.attributes.src.value = selectedFighters.user.images.block
    }, 350);
    fighter1.style.height = '60%'
    fighter1.style.width = '15%'
    setTimeout(() => {
      fighter1.attributes.src.value = selectedFighters.user.images.stand
      fighter1.style.width = '20%'
      fighter1.style.height = '75%'
    }, 850);
  } else {
    if (selectedFighters.user.name !== 'SMOKE') {
      setTimeout(() => {
        fighter1.attributes.src.value = selectedFighters.user.images.gothit
        attackingInfoGroup.user.hp = attackingInfoGroup.user.hp > 21 ? attackingInfoGroup.user.hp - 21 : attackingInfoGroup.user.hp - attackingInfoGroup.user.hp
        userProgress.style.width = `${attackingInfoGroup.user.hp}%`
      }, 350);
      fighter1.style.height = '60%'
      fighter1.style.width = '15%'
      setTimeout(() => {
        if (attackingInfoGroup.user.hp) {
          fighter1.attributes.src.value = selectedFighters.user.images.stand
        } else {
          fighter1.attributes.src.value = selectedFighters.user.images.lose
          if (attackingInfoGroup.random.hp) {
            fighter2.attributes.src.value = selectedFighters.random.images.win
          } else {
            fighter2.attributes.src.value = selectedFighters.random.images.lose
            draw.classList.add('active')
          }
          attackingInfo.classList.remove('active')
          restartBtn.classList.add('active')
        }
        fighter2.style.width = '20%'
        fighter2.style.height = '75%'
      }, 850);
    } else {
      setTimeout(() => {
        fighter1.attributes.src.value = selectedFighters.user.images.gothit
        attackingInfoGroup.user.hp = attackingInfoGroup.user.hp > 21 ? attackingInfoGroup.user.hp - 21 : attackingInfoGroup.user.hp - attackingInfoGroup.user.hp
        userProgress.style.width = `${attackingInfoGroup.user.hp}%`
      }, 350);

      setTimeout(() => {
        if (attackingInfoGroup.user.hp) {
          console.log('random is attacking', attackingInfoGroup.user.hp)
          fighter1.attributes.src.value = selectedFighters.user.images.stand
        } else {
          console.log('random is attacking', attackingInfoGroup.user.hp)
          fighter1.attributes.src.value = selectedFighters.user.images.lose
          if (attackingInfoGroup.random.hp) {
            fighter2.attributes.src.value = selectedFighters.random.images.win
          } else {
            fighter2.attributes.src.value = selectedFighters.random.images.lose
            draw.classList.add('active')
          }
          attackingInfo.classList.remove('active')
          restartBtn.classList.add('active')
        }
      }, 850);
    }
  }
}

fightBtn.addEventListener('mouseover', (e) => {
  if (!selectedFighters.user) {
    fightBtn.style.cursor = 'not-allowed'
  } else {
    fightBtn.style.cursor = 'pointer'
  }
})


const getRandomImage = (images) => {
  return images[Math.floor(Math.random() * (images.length))] ? images[Math.floor(Math.random() * (images.length))] : images[images.length - 1]
}

restartBtn.addEventListener('click', () => {
  window.location.reload()
})
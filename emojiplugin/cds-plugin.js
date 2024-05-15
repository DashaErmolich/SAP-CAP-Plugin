const cds = require('@sap/cds')

//most important --> define emojis!

const emojis = ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "🥲", "🥹", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍"]

//our business logic...

function getRandomEmoji() {

  return emojis[Math.floor(Math.random() * emojis.length)]

}

// we register ourselves to the cds once served event

// a one-time event, emitted when all services have been bootstrapped and added to the express app

cds.once('served', () => {

  // go through all services

  for (let srv of cds.services) {

    // go through all entities

    for (let entity of srv.entities) {

      // go through all elements in the entity and collect those with @randomEmoji annotation

      const emojiElements = []

      for (const key in entity.elements) {

        const element = entity.elements[key]

        // check if there is an annotation called randomEmoji on the element

        if (element['@randomEmoji']) emojiElements.push(element.name)

      }

      if (emojiElements.length) {

        // register a new handler on the service, that is called on every read operation

        srv.after('READ', entity, data => {

          if (!data) return

          // if we read a single entry, we don't get an array of data, so let's make sure we deal with an array

          let myData = Array.isArray(data) ? data : [data]

          // go through all query read results (in this case the books)

          for (let entry of myData) {

            for (const element of emojiElements) {

              if (entry[element]) {

                entry[element] += getRandomEmoji()

              }

            }

          }

        })

      }

    }

  }

})
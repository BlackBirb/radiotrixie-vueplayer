class Track {
  constructor(id, { title, author }, opt = {}) {
    id = Number(id)
    if(!id || isNaN(id))
      throw new TypeError('Track id is not defined or not a number')
    this.id = id
    
    if(!title && !author)
      throw Error("Track requires either title or author or both")
    this.title = title || null
    this.author = author || null

    this.albumCover = opt.albumCover || null
    this.duration = Number(opt.duration) || null
    this.beginAt = Number(opt.beginAt) || null
  }
}

export function createWith(cb, store) {
  function $dispatch(name, payload) {
    if(arguments.length < 2)
      throw new TypeError(`Failed to execute '$dispatch': 2 arguments required, but only ${arguments.length} present.`)
    if(typeof name !== 'string')
      throw new TypeError('Action name must be a string')
    store.dispatch(name, payload)
  }
  function $get(name) {
    if(typeof name !== 'string')
      throw new TypeError('Action name must be a string')
    return store.getters[name]
  }

  const importable = {
    'Track': Track,
    'dispatch': $dispatch,
    'get': $get
  }

  cb({
    'use': name => {
      return importable[name]
    }
  })
}

export { Track }
import { mount } from '@vue/test-utils'
import Navigation from '@/components/Navigation.vue'
import router from '@/router/index'

let wrapper = null

// SETUP - run prior to each unit test
beforeEach(async () => {
  // push the '/' link to vue-router to load the Home page
  router.push('/')
  await router.isReady()

  // render the comonent
  wrapper = mount(Navigation, {
    global: {
      plugins: [router]
    }
  })
})

// TEARDOWN - run after to each unit test
afterEach(() => {
  wrapper.unmount()
})

describe('Navigation.vue Test', () => {
  it('renders navigation links when component is created', () => {
    // check that 3 navigation links are created
    const items = wrapper.findAll('li')
    expect(items.length).toEqual(3)
    expect(items[0].text()).toMatch('Home')
    expect(items[1].text()).toMatch('About')
    expect(items[2].text()).toMatch('Blog')
  })
// eslint-disable-next-line eol-last
})
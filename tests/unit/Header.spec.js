import { shallowMount } from '@vue/test-utils'
import Header from '@/components/Header.vue'

describe('Header.vue Test', () => {
  it('renders message when component is created', () => {
    // render the component
    const wrapper = shallowMount(Header, {
      props: {
        title: 'Vue Project'
      }
    })

    // check that the title is rendered
    expect(wrapper.text()).toMatch('Vue Project')
  })
// eslint-disable-next-line eol-last
})
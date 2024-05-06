import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai'; 

import EmployeeList from '../src/screens/EmployeeListScreen';


function generateMockData() {
  return [
    {
      cell: '068-5459-815',
      dob: { age: 24, date: new Date('2000-02-20T01:18:22.006Z') },
      email: 'jakov.srejovic@example.com',
      gender: 'male',
      id: { name: 'SID', value: '141368662' },
      location: {
        city: 'Valjevo',
        coordinates: ['Object'], 
        country: 'Serbia',
        postcode: 79791,
        state: 'Pomoravlje',
        street: ['Object'], 
        timezone: ['Object'], 
      },
      login: {
        md5: '33087fd5113458823ed9d12142f27d7e',
        password: 'scully',
        salt: 'WFd3pT84',
        sha1: '10cf546c4b251bad863b99780448dc46de11749e',
        sha256: '4fa01d222aad6269988fd0a6217e61aba1e9eebd9c468513d392cca866ad2176',
        username: 'crazygoose383',
        uuid: '5b240e9c-c80e-44bf-ac45-5fbb668d94b7',
      },
      name: { first: 'Jakov', last: 'Srejović', title: 'Mr' },
      nat: 'RS',
      phone: '024-5862-741',
      picture: {
        large: 'https://randomuser.me/api/portraits/men/71.jpg',
        medium: 'https://randomuser.me/api/portraits/med/men/71.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/men/71.jpg',
      },
      registered: { age: 7, date: new Date('2016-09-26T01:39:21.845Z') },
    },
  ];
}

describe('<EmployeeList />', () => {
  it('renders a flat list of employees', () => {
    const mockData = generateMockData();
    const wrapper = shallow(<EmployeeList data={mockData} />);
    const flatList = wrapper.find('FlatList');
    expect(flatList.exists()).to.be.true;


    const renderProp = flatList.prop('renderItem');


    const renderedItems = mockData.map((item, index) => {
      return renderProp({ item, index });
    });

    expect(renderedItems).to.have.lengthOf(mockData.length);


    renderedItems.forEach((renderedItem, index) => {
      const { name, id } = mockData[index];

      expect(renderedItem.props.name).to.equal(`${name.first} ${name.last}`);
      expect(renderedItem.props.id).to.equal(id.value);
    });
  });
});

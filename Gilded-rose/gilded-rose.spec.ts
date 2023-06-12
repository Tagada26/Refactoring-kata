import { OldGildedRose, Item } from "./old-gilded-rose";
import { GildedRose } from "./gilded-rose";
import { itemsList } from "./golden-master-text-test";


describe('Gilded Rose', () => {
  it('should foo', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('foo');
  });
});

describe('Gilded Rose golden master', () => {
  it('should foo', () => {
    const gildedRose = new OldGildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('foo');
  });
  it.each(itemsList) ('should update quality as expected for $name' , (item) => {
    //Given
    const oldGildedRose = new OldGildedRose([{...item}]);
    const gildedRose = new GildedRose([{...item}]);
    //when
    const oldItems = oldGildedRose.updateQuality();
    const items = gildedRose.updateQuality();
    //then
    expect(items).toEqual(expect.arrayContaining(oldItems));
  })
  it.each(itemsList) ('should update quality as expected for $name' , (item) => {
    //Given
    const oldGildedRose = new OldGildedRose([{...item}]);
    const gildedRose = new GildedRose([{...item}]);
    //when
    let days: number = 1000;

    for (let i = 0; i < days; i++) {
      const oldItems = oldGildedRose.updateQuality();
      const items = gildedRose.updateQuality();
      //then
      expect(items).toEqual(expect.arrayContaining(oldItems));
    }
  })
});


describe('Item is immutable', () => {
  // Nous n'avons pas le droit de toucher à la classe item 
  const item = new Item('hello', 0, 0);
  //Name, Sellin et quality
  const properties = Object.keys(item);

  it('should there 3 properties', () => {
    expect(properties.length).toEqual(3)
  })
  it('should the first property is name', ()=> {
    expect(properties[0]).toEqual('name');
  })
  it('sould the second property is sellIn', ()=> {
      expect(properties[1]).toEqual('sellIn');
  })
  it('sould the third property is quality', ()=> {
    expect(properties[2]).toEqual('quality');
  })
})


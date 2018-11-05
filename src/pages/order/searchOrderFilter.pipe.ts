import { Pipe, PipeTransform } from '@angular/core';
import { Order } from '../../service/order';


@Pipe({
    name: 'orderFilter'
})
export class SearchOrderFilterPipe implements PipeTransform {
    transform(items: Order[], searchOrderText: string, categoryOrder: string): Order[] {
        if (!items) return [];
        if (!searchOrderText) {
            searchOrderText = searchOrderText.toLowerCase();
            return items.filter(it => {
                return (
                    (it.o_Id.toString().toLowerCase().includes(categoryOrder))
                );
            });
        }
        else {
            searchOrderText = searchOrderText.toLowerCase();
            return items.filter(it => {
                return (
                    (it.o_Id.toString().includes(searchOrderText))
                );
            });
        }


    }
}
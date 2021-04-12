import AvrgirlArduino from 'avrgirl-arduino';
import hex from '!file-loader!./filetoflashuno.hex';
import logger from '../../logger';
import store from '../../../store';

const log = logger('FlashLib: ');
const FlashingFirmware = (recievedPortNumber) => {
    const controller = store.get('controllers["' + recievedPortNumber + '"]');

    try {
        let avrgirl = new AvrgirlArduino({
            board: 'uno',
            debug: true,
            port: recievedPortNumber,
        });

        // avrgirl.flash('../../BLANK HEX TO TEST.hex', error => {
        avrgirl.flash(hex, error => {
            if (error) {
                controller.command('flashing:failed', error);
                log.debug(`${error} Error flashing board`);
            } else {
                log.debug('FLASH SUCCESFULL!!!');
                controller.command('flashing:success');
            }
        });
    } catch (error) {
        // controller.command('flashing:failed', error);
        log.debug(`${error} Error flashing board -CATCH`);
    }
};


export default FlashingFirmware;
const selectors = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    invalidInputClass: 'popup__input_invalid',
    buttonSelector: '.popup__save-btn',
    inactiveButtonClass:  'popup__save-btn_inactive',
    activeErrorClass: 'popup__input-error_active'
};

const hasInvalidInput = (popupInputList) => {
    return popupInputList.some((popupInputElement) => {
        return !popupInputElement.validity.valid;
    })
};

const toggleButtonState = (popupFormList, buttonElement) => {
    if (hasInvalidInput(popupFormList)) {
        buttonElement.classList.add(selectors.inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.classList.remove(selectors.inactiveButtonClass);
        buttonElement.removeAttribute('disabled', true);
    }
}

const showErrorMessage = (popupFormElement, popupInputElement, errorMessage) => {
    const errorElement = popupFormElement.querySelector(`.${popupInputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(selectors.activeErrorClass);
    popupInputElement.classList.add(selectors.invalidInputClass);
};

const hideErrorMessage = (popupFormElement, popupInputElement) => {
    const errorElement = popupFormElement.querySelector(`.${popupInputElement.id}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove(selectors.activeErrorClass);
    popupInputElement.classList.remove(selectors.invalidInputClass);
}

const checkInputValidity = (popupFormElement, popupInputElement) => {
    if (!popupInputElement.validity.valid) {
        showErrorMessage(popupFormElement, popupInputElement, popupInputElement.validationMessage);
    } else {
        hideErrorMessage(popupFormElement, popupInputElement);
    }
};

const setEventListeners = (popupFormElement) => {
    const popupInputList = Array.from(popupFormElement.querySelectorAll(selectors.inputSelector));
    const ButtonElement = popupFormElement.querySelector(selectors.buttonSelector);
    toggleButtonState(popupInputList, ButtonElement);
    popupInputList.forEach((popupInputElement) => {
        popupInputElement.addEventListener('input', () => {
            checkInputValidity(popupFormElement, popupInputElement);
            toggleButtonState(popupInputList, ButtonElement);
        })
    });
};

const enableValidation = () => {
    const popupFormList = Array.from(document.querySelectorAll(selectors.formSelector));
    popupFormList.forEach((popupFormElement) => {
        popupFormElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(popupFormElement);
    })
}

enableValidation();
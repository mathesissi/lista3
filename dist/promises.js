"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function delay(ms) {
    return new Promise((resolve, reject) => setTimeout(() => {
        if (ms > 2000) {
            console.log("Operação concluída após " + ms / 1000 + " segundos.");
            resolve();
        }
        else {
            console.log("Tempo insuficiente para concluir a operação.");
            reject();
        }
    }, ms));
}
function test() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Antes da execução do delay....");
            yield delay(2000);
            console.log("Fim da promise");
        }
        catch (err) {
            console.log("Ocorreu algum erro...");
        }
        finally {
            console.log("Depois da execução do delay....");
        }
    });
}
function test_01() {
    console.log("Antes da execução do delay....");
    delay(2000).then(() => {
        console.log("Fim da promise");
    }).catch(() => {
        console.log("Ocorreu algum erro...");
    }).finally(() => {
        console.log("Depois da execução do delay....");
    });
}
test();

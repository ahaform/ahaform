export function generateNode(nodeString: string): HTMLElement {
    const tmpNode = document.createElement("div");
    tmpNode.innerHTML = nodeString;
    return tmpNode.firstChild as HTMLElement;
}

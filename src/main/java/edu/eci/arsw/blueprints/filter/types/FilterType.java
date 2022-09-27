package edu.eci.arsw.blueprints.filter.types;

import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.persistence.BlueprintNotFoundException;
import edu.eci.arsw.blueprints.persistence.BlueprintPersistenceException;

import java.util.Set;

public interface FilterType {

    /**
     * Filtra los puntos de un blueprint
     * @param bp
     * @throws BlueprintNotFoundException
     */
    public void filterBlueprint(Blueprint bp) throws BlueprintNotFoundException;

    /**
     * Filtra un arreglo de blueprints
     * @param blueprints
     * @throws BlueprintPersistenceException
     * @throws BlueprintNotFoundException
     */
    public void filterBlueprints(Set<Blueprint> blueprints) throws BlueprintPersistenceException, BlueprintNotFoundException;

    /**
     * Filtra un arreglo de blueprints pero solo del autor escogido
     * @param author
     * @param blueprints
     * @throws BlueprintNotFoundException
     */
    public void filterPrintsByAuthor(String author, Set<Blueprint> blueprints) throws BlueprintNotFoundException;
}

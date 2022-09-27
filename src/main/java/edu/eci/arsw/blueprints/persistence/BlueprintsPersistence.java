/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.blueprints.persistence;

import edu.eci.arsw.blueprints.model.Blueprint;

import java.util.Set;

/**
 *
 * @author hcadavid
 */
public interface BlueprintsPersistence {
    
    /**
     * Guarda el Blueprint en nuestro Set
     * @param bp blueprint
     * @throws BlueprintPersistenceException 
     */
    public void saveBlueprint(Blueprint bp) throws BlueprintPersistenceException;
    
    /**
    * Retorna el blueprint
     * @param author 
     * @param bprintname 
     * @return 
     * @throws BlueprintNotFoundException 
     */
    public Blueprint getBlueprint(String author,String bprintname) throws BlueprintNotFoundException;

    /**
     * Retorna el Set de Blueprints
     * @return
     * @throws BlueprintPersistenceException
     * @throws BlueprintNotFoundException
     */
    public Set<Blueprint> getBluePrints() throws BlueprintPersistenceException, BlueprintNotFoundException;

    /**
     * Retorna los Blueprints creados por un autor en especifico
     * @param author autor que se desea conocer que Blueprints genero
     * @return 
     * @throws BlueprintNotFoundException si el autor no existe
     */
    public Set<Blueprint> getBlueprintsByAuthor(String author) throws BlueprintNotFoundException;
    
}
